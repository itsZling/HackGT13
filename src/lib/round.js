import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

// The rounds/{code} doc is reused and fully overwritten every time a lobby
// starts a new round (see startRound), rather than getting a fresh doc id.
// A player who watched a previous round and then went quiet (sat in the
// Lobby screen, which doesn't subscribe to rounds/*) still has that old
// round cached locally — so when they land back on /round/:code and this
// attaches a brand-new listener, Firestore's very first callback can be that
// stale cached snapshot (metadata.fromCache: true) before the real, current
// one arrives from the server a moment later. Skipping fromCache snapshots
// means callers only ever see the confirmed-current round — never a
// leftover previous one with its own (already-full) submittedPlayerIds.
//
// includeMetadataChanges: true is required for that skip to ever resolve.
// Every Round -> Voting (and Voting -> Results) transition re-subscribes to
// this SAME doc from scratch, and its cached copy is usually already
// correct at that point (the previous screen's own listener just saw the
// live write). Without this option, onSnapshot only re-invokes the callback
// when the document's DATA changes — a metadata-only flip from fromCache:
// true to fromCache: false, with identical data, fires no follow-up event at
// all. That left the very first (filtered-out) snapshot as the only one this
// listener would ever deliver, so `round` got stuck undefined forever on
// every single voting/results screen, not just replays.
export function subscribeRound(code, callback) {
  const ref = doc(db, "rounds", code.trim().toUpperCase());
  return onSnapshot(ref, { includeMetadataChanges: true }, (snap) => {
    if (snap.metadata.fromCache) return;
    callback(snap.exists() ? { id: snap.id, ...snap.data() } : null);
  });
}
