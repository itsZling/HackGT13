import { db } from "../firebase";
import { doc, setDoc, collection, query, where, onSnapshot } from "firebase/firestore";

// Deterministic doc id so re-voting (changing your pick) overwrites the same
// doc instead of piling up one Vote per click. Keyed by roundKey (each play
// of a lobby's round gets its own, see lib/lobby.js's startRound) and NOT the
// lobby code — the lobby code is reused across every round played in that
// lobby, so keying on it would let a player's previous-round vote count as
// already having voted this round.
function voteId(roundKey, voterId) {
  return `${roundKey}_${voterId}`;
}

export async function castVote(roundKey, voterId, votedForPlayerId) {
  if (voterId === votedForPlayerId) {
    throw new Error("You can't vote for your own submission");
  }
  await setDoc(doc(db, "votes", voteId(roundKey, voterId)), {
    roundId: roundKey,
    voterId,
    votedForPlayerId,
  });
}

export function subscribeVotes(roundKey, callback) {
  const q = query(collection(db, "votes"), where("roundId", "==", roundKey));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => d.data()));
  });
}
