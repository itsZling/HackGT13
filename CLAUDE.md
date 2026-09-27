# Project: SeaSS (CSS VisTool & Multiplayer Game) — HackGT13

## Stack
- Frontend: React + Vite
- Backend/state: Firestore (real-time listeners for lobby/round sync — no custom WebSocket layer)
- Submission rendering: sandboxed <iframe srcdoc="..."> ONLY — never render player HTML/CSS in main DOM
- Hosting: Vercel/Netlify (frontend), Firebase (backend)

## Two modes
- Vis Tool: solo sandbox, no backend dependency, no scoring/target
- Play: multiplayer game, lobby → round → vote → winner

## Data model (Firestore)
- Lobby: code, hostId, status (lobby|round|voting|results), settings {timeLimit, difficulty}, players [{id, name}]
- Round: lobbyId, roundKey (unique per play of this lobby's round — see below), targetId, startedAt, endsAt, submittedPlayerIds []
- Submission: roundId (= the round's roundKey, not the lobby code), playerId, html (single field: markup + its own <style> block together, no separate css field), submittedAt
- Vote: roundId (= the round's roundKey, not the lobby code), voterId, votedForPlayerId
- Target: id, difficulty, referenceImage, sampleSolution (optional)

## Confirmed decisions (don't relitigate)
- One lobby = one round = one winner, no cumulative scoring
- No self-voting
- Round advances the moment all players submit, independent of timer; auto-submit remaining players at timer 0
- "Swap" toggles preview between own render and target reference (not split-screen)
- After results, always return to Lobby Settings — no "Play Again" fork
- No player cap for this build

## MVP cut line (if behind schedule, cut in this order)
1. Extra CSS properties beyond align/background/margin/padding
2. Auto-scoring alongside voting
3. Visual polish/transitions
4. Target library beyond the minimum 6 (2 per difficulty)

## Current State
- Basic UI and Firebase setup.
- Lobby logic set up: users can create lobbies with randomized codes, and other players can join. The host is a player too (included in `players[]` on creation, votes/submits like anyone else). Non-host players see the host's settings changes live (read-only) via the same Firestore listener. Each player's own name is bolded in their player list so they can tell which one is them.
- Visiting `/lobby/:code` directly now gates on membership (checks `playerId` against `players[]`) and shows a join form instead of the full lobby if you're not in it yet — closes the "copy-pasted the link without joining" UX hole. Note: this is a UI-level check only, not a security boundary — see note below.
- Submission and Game Logic: hosts can start lobbies, entering a separate screen where each user can input HTML/CSS that is actively displayed, and can compare their working submission to the target image for that round. Users' submissions will be submitted either manually by them or automatically when the timer is done. Firebase data is accordingly updated to change the lobby's status to "voting" in this case.
- Replaying a lobby (Return to Lobby -> Start again) now works correctly: the rounds/{code} doc is reused doc-id-wise across every round a lobby plays, but each start stamps a fresh `roundKey`, and Submission/Vote docs are keyed/queried off that roundKey rather than the lobby code — otherwise a player's previous-round submission/vote would still satisfy the new round's "already submitted"/"already voted" checks. subscribeRound also ignores Firestore's stale-from-local-cache snapshot that a fresh listener attach can briefly deliver (e.g. after sitting on the Lobby screen, which doesn't watch rounds/*), so a new round's page never briefly reads the previous round's already-full submittedPlayerIds.