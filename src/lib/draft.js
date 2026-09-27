// Per-round, per-player local draft so a refresh doesn't wipe unsaved edits.
// Not synced anywhere — purely a local safety net before the real submit.
// Keyed by roundKey (each play of a lobby's round gets its own, see
// lib/lobby.js's startRound), NOT the lobby code — the lobby code is reused
// across every round played in that lobby, so a draft keyed on it would
// resurface a previous round's leftover text as this round's.
function draftKey(roundKey, playerId) {
  return `seass_draft_${roundKey}_${playerId}`;
}

// The draft is just the player's raw editor content (markup + <style> block
// together) — stored as plain text, matching the single-field Submission
// schema, no JSON envelope needed.
export function loadDraft(roundKey, playerId) {
  try {
    return localStorage.getItem(draftKey(roundKey, playerId));
  } catch {
    return null;
  }
}

export function saveDraft(roundKey, playerId, html) {
  try {
    localStorage.setItem(draftKey(roundKey, playerId), html);
  } catch {
    // best-effort; a full/blocked localStorage just means no draft persistence
  }
}

export function clearDraft(roundKey, playerId) {
  try {
    localStorage.removeItem(draftKey(roundKey, playerId));
  } catch {
    // ignore
  }
}
