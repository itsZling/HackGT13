import { db } from "../firebase";
import { doc, getDoc, arrayUnion, writeBatch, serverTimestamp, collection, query, where, onSnapshot } from "firebase/firestore";

// Deterministic doc id so a duplicate submit (double-click, retry) overwrites
// the same doc instead of creating a second one. Keyed by roundKey (each
// play of a lobby's round gets its own, see lib/lobby.js's startRound) and
// NOT the lobby code — the lobby code is reused across every round played in
// that lobby, so keying on it would let a player's previous-round submission
// resurface as "this round's" the moment they replay.
function submissionId(roundKey, playerId) {
  return `${roundKey}_${playerId}`;
}

export async function getSubmission(roundKey, playerId) {
  const snap = await getDoc(doc(db, "submissions", submissionId(roundKey, playerId)));
  return snap.exists() ? snap.data() : null;
}

// Live feed of every submission for a round, for the voting grid — keyed by
// roundId (the round's roundKey) rather than fetched one doc at a time per
// player.
export function subscribeSubmissions(roundKey, callback) {
  const q = query(collection(db, "submissions"), where("roundId", "==", roundKey));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => d.data()));
  });
}

// `html` is the player's whole editor field — markup and its own <style>
// block together — stored as one string; there is no separate css field.
// Takes both the lobby `code` (to flip this player into the live
// rounds/{code} doc's submittedPlayerIds) and the round's own `roundKey` (to
// scope the submission doc/query so it can't bleed into a later round).
export async function submitEntry(code, roundKey, playerId, html) {
  const roundRef = doc(db, "rounds", code);
  const submissionRef = doc(db, "submissions", submissionId(roundKey, playerId));

  const batch = writeBatch(db);
  batch.set(submissionRef, {
    roundId: roundKey,
    playerId,
    html,
    submittedAt: serverTimestamp(),
  });
  batch.update(roundRef, {
    submittedPlayerIds: arrayUnion(playerId),
  });
  await batch.commit();
}
