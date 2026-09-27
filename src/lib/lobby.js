import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, onSnapshot, writeBatch, serverTimestamp } from "firebase/firestore";
import { pickRandomTargetId } from "./targets";

// Excludes 0/O and 1/I so codes read back over voice/screen without ambiguity.
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CODE_LENGTH = 5;
const MAX_CODE_ATTEMPTS = 5;

function generateLobbyCode() {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

function defaultSettings() {
  return { timeLimit: 120, difficulty: "easy" };
}

// Small, fixed-lifespan hackathon build: naive random code + retry-on-collision
// is enough, no need for a fancier allocation scheme.
export async function createLobby(host) {
  for (let attempt = 0; attempt < MAX_CODE_ATTEMPTS; attempt++) {
    const code = generateLobbyCode();
    const ref = doc(db, "lobbies", code);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        code,
        hostId: host.id,
        status: "lobby",
        settings: defaultSettings(),
        players: [host],
      });
      return code;
    }
  }
  throw new Error("Could not generate a unique lobby code, please try again");
}

export async function joinLobby(code, player) {
  const normalized = code.trim().toUpperCase();
  const ref = doc(db, "lobbies", normalized);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    throw new Error("Lobby not found");
  }
  const data = snap.data();
  if (data.status !== "lobby") {
    throw new Error("This lobby has already started");
  }

  const existingPlayers = data.players || [];
  const alreadyJoined = existingPlayers.some((p) => p.id === player.id);
  const nextPlayers = alreadyJoined
    ? existingPlayers.map((p) => (p.id === player.id ? { ...p, name: player.name } : p))
    : [...existingPlayers, player];

  await updateDoc(ref, { players: nextPlayers });
  return normalized;
}

export function subscribeLobby(code, callback) {
  const ref = doc(db, "lobbies", code.trim().toUpperCase());
  return onSnapshot(ref, (snap) => {
    callback(snap.exists() ? { id: snap.id, ...snap.data() } : null);
  });
}

export async function updateLobbySettings(code, settings) {
  await updateDoc(doc(db, "lobbies", code), { settings });
}

// Exported so Round.jsx's on-screen "Time's up" -> countdown -> navigate
// sequence uses these exact same numbers, rather than a second copy that
// could drift out of sync with the deadline stamped below.
export const VOTING_STATIC_MESSAGE_MS = 2000;
export const VOTING_COUNTDOWN_SECONDS = 5;
export const ROUND_TO_VOTING_TRANSITION_MS = VOTING_STATIC_MESSAGE_MS + VOTING_COUNTDOWN_SECONDS * 1000;
const VOTING_DURATION_MS = 15000;

// Idempotent: safe for multiple clients to call at once when they all notice
// the round is fully submitted, no need to elect a single writer. Also stamps
// the round with a voting deadline (mirrors how startRound stamps endsAt) so
// every client can run its own forced-transition countdown on the voting
// screen, same pattern as the round timer. The deadline starts counting from
// when players actually LAND on the voting screen, not from this call —
// players spend ROUND_TO_VOTING_TRANSITION_MS still watching the round page's
// own countdown first, so that gets added on top of the visible 15s.
export async function advanceToVoting(code) {
  const batch = writeBatch(db);
  batch.update(doc(db, "lobbies", code), { status: "voting" });
  batch.update(doc(db, "rounds", code), {
    votingEndsAt: Date.now() + ROUND_TO_VOTING_TRANSITION_MS + VOTING_DURATION_MS,
  });
  await batch.commit();
}

// Same idempotent, no-elected-writer pattern as advanceToVoting, triggered
// once every player has cast a vote.
export async function advanceToResults(code) {
  await updateDoc(doc(db, "lobbies", code), { status: "results" });
}

// Per CLAUDE.md: after results, always back to Lobby Settings — no "Play
// Again" fork. Any player can call this; racing writes are harmless since
// they all set the same value.
export async function returnToLobby(code) {
  await updateDoc(doc(db, "lobbies", code), { status: "lobby" });
}

// General rule, not a host-leaving special case: whoever explicitly leaves
// is removed from players, and if they happened to be the host, the new
// first remaining player inherits hostId. This covers a host leaving after
// round 1, after results, or never — it's all the same code path. An empty
// players array (host included) is left with hostId: null as the signal
// that the lobby is abandoned.
//
// Read-then-write, same as joinLobby — not transactional, so two players
// leaving in the same instant could race and one's removal could be
// clobbered by the other's write. Same tolerance level as the rest of this
// hackathon build; a player who already left has already navigated away, so
// a stale entry surviving one race is cosmetic, not a lost-work problem.
export async function leaveLobby(code, playerId) {
  const ref = doc(db, "lobbies", code);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const data = snap.data();
  const remainingPlayers = (data.players || []).filter((p) => p.id !== playerId);
  const updates = { players: remainingPlayers };
  if (data.hostId === playerId) {
    updates.hostId = remainingPlayers.length > 0 ? remainingPlayers[0].id : null;
  }
  await updateDoc(ref, updates);
}

// Round doc id matches the lobby code, one lobby = one round at a time — but
// a lobby can play many rounds back to back ("Return to Lobby" -> Start
// again), all reusing that same rounds/{code} doc. roundKey gives each of
// those plays its own identity so Submission/Vote docs (which live in their
// own collections, keyed off this value rather than the doc they're nested
// under) can't be mistaken for a later round's — see submission.js/vote.js.
export async function startRound(code) {
  const lobbyRef = doc(db, "lobbies", code);
  const lobbySnap = await getDoc(lobbyRef);
  if (!lobbySnap.exists()) {
    throw new Error("Lobby not found");
  }
  const lobby = lobbySnap.data();
  const timeLimit = lobby.settings?.timeLimit ?? 120;
  const difficulty = lobby.settings?.difficulty ?? "easy";
  const targetId = pickRandomTargetId(difficulty);
  const roundKey = crypto.randomUUID();

  const batch = writeBatch(db);
  batch.update(lobbyRef, { status: "round" });
  batch.set(doc(db, "rounds", code), {
    lobbyId: code,
    roundKey,
    targetId,
    startedAt: serverTimestamp(),
    endsAt: Date.now() + timeLimit * 1000,
    submittedPlayerIds: [],
  });
  await batch.commit();
}
