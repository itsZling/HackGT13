import { useEffect, useLayoutEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { subscribeLobby, returnToLobby, leaveLobby } from './lib/lobby'
import { subscribeRound } from './lib/round'
import { subscribeSubmissions } from './lib/submission'
import { subscribeVotes } from './lib/vote'
import { resolveWinners } from './lib/tally'
import { getTargetById } from './lib/targets'
import { getPlayerId } from './lib/playerId'
import SandboxFrame from './SandboxFrame'

// Sentinel for the preview toggle, distinct from any real (UUID) playerId.
const TARGET_VIEW = 'target-reference'

// Matches the target reference PNGs' own proportions (checked: 800x600).
const PREVIEW_ASPECT_RATIO = 4 / 3
const PREVIEW_MAX_WIDTH_FRACTION = 0.7

// CSS aspect-ratio only derives a MISSING dimension from a known one — it
// won't jointly shrink both width and height to fit two independent caps
// (70% of available width, 100% of available height) the way `object-fit:
// contain` does for images. Measuring the stage directly and computing the
// binding constraint ourselves is what actually guarantees the frame never
// exceeds the space left after the header/button rows, on any screen size.
//
// Uses a callback ref (state, not useRef) rather than a plain ref + effect:
// this component returns early on several conditional branches (loading, not
// found) before the stage div exists at all, so the node can attach well
// after mount — a useRef+useEffect([ref]) pairing would fire once while
// stage.current is still null and never re-run when the real node shows up.
function useFitPreviewSize() {
  const [stageNode, setStageNode] = useState(null)
  const [size, setSize] = useState(null)

  useLayoutEffect(() => {
    if (!stageNode) return

    function measure() {
      const { width, height } = stageNode.getBoundingClientRect()
      if (width <= 0 || height <= 0) return
      const widthFromWidthCap = width * PREVIEW_MAX_WIDTH_FRACTION
      const widthFromHeightCap = height * PREVIEW_ASPECT_RATIO
      const frameWidth = Math.min(widthFromWidthCap, widthFromHeightCap)
      setSize({ width: frameWidth, height: frameWidth / PREVIEW_ASPECT_RATIO })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(stageNode)
    return () => observer.disconnect()
  }, [stageNode])

  return [setStageNode, size]
}

export default function Results() {
  const { code } = useParams()
  const navigate = useNavigate()
  const [lobby, setLobby] = useState(undefined)
  const [round, setRound] = useState(undefined)
  const [submissions, setSubmissions] = useState([])
  const [votes, setVotes] = useState([])
  const [selectedView, setSelectedView] = useState(null)
  const [error, setError] = useState('')
  const [stageRef, previewSize] = useFitPreviewSize()

  const playerId = getPlayerId()

  useEffect(() => {
    if (!code) return
    return subscribeLobby(code, setLobby)
  }, [code])

  useEffect(() => {
    if (!code) return
    return subscribeRound(code, setRound)
  }, [code])

  // Scoped by round.roundKey, not the lobby code: the code is reused across
  // every round this lobby plays, but submissions/votes are keyed per-round
  // (see lib/lobby.js's startRound) so an earlier round's data can never
  // resurface as this round's results.
  useEffect(() => {
    if (!round?.roundKey) return
    return subscribeSubmissions(round.roundKey, setSubmissions)
  }, [round?.roundKey])

  useEffect(() => {
    if (!round?.roundKey) return
    return subscribeVotes(round.roundKey, setVotes)
  }, [round?.roundKey])

  if (!code) {
    return (
      <div className="flex flex-col items-center justify-center grow p-8">
        <p className="mb-4">No active round to show results for.</p>
        <Link to="/" className="text-sky-600 dark:text-sky-400 font-medium">Go home</Link>
      </div>
    )
  }

  if (lobby === undefined) {
    return (
      <div className="flex flex-col items-center justify-center grow p-8">
        <p>Loading results...</p>
      </div>
    )
  }

  if (lobby === null) {
    return (
      <div className="flex flex-col items-center justify-center grow p-8">
        <p className="mb-4">No lobby found for code "{code}".</p>
        <Link to="/" className="text-sky-600 dark:text-sky-400 font-medium">Go home</Link>
      </div>
    )
  }

  const playersById = new Map((lobby.players || []).map((p) => [p.id, p]))
  const submissionsByPlayerId = Object.fromEntries(submissions.map((s) => [s.playerId, s]))
  const winners = resolveWinners(votes, submissionsByPlayerId)
  const target = round ? getTargetById(round.targetId) : null

  // Derived during render rather than synced via effect: fall back to the
  // first winner whenever the current selection isn't (or is no longer)
  // valid — a winner still in the list, or the target view when one exists.
  // With no votes there's nothing to toggle between, so the target is the
  // only thing ever shown.
  const isSelectionValid = selectedView === TARGET_VIEW ? Boolean(target) : winners.includes(selectedView)
  const activeView = winners.length === 0 ? TARGET_VIEW : isSelectionValid ? selectedView : winners[0]
  const activeWinnerId = activeView === TARGET_VIEW ? null : activeView
  const activeSubmission = activeWinnerId ? submissionsByPlayerId[activeWinnerId] : null

  async function handleReturnToLobby() {
    setError('')
    try {
      await returnToLobby(code)
      navigate(`/lobby/${code}`)
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleLeaveLobby() {
    setError('')
    try {
      await leaveLobby(code, playerId)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    // Fixed to exactly the viewport minus the header (the 73px figure matches
    // Navbar.jsx / Vistool.jsx) with overflow-hidden, rather than "grow": the
    // page can never exceed one screen or need to scroll. pb matches that
    // same header height so the bottom gutter is at least as tall as the top
    // one — the stage below measures whatever room this leaves it and sizes
    // the frame to fit inside it, so this is safe to adjust freely.
    <div className="flex flex-col h-[calc(100vh-73px)] overflow-hidden w-full p-8 pb-[73px] gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Results</h2>
        <div className="flex items-center gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">Lobby: <span className="font-mono">{lobby.code}</span></p>
          <button
            type="button"
            onClick={handleReturnToLobby}
            className="px-3 py-1.5 text-sm bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-md transition-colors"
          >
            Return to Lobby
          </button>
          <button
            type="button"
            onClick={handleLeaveLobby}
            className="px-3 py-1.5 text-sm bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-medium rounded-md transition-colors"
          >
            Leave Lobby
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-md bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col grow min-h-0 gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {winners.length === 0 ? (
            <p className="text-slate-600 dark:text-slate-400">No votes were cast this round.</p>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mr-1">
                {winners.length > 1 ? 'Co-winners:' : 'Winner:'}
              </h3>
              {winners.map((winnerId) => {
                const name = playersById.get(winnerId)?.name ?? 'Unknown player'
                const isActive = winnerId === activeView
                return (
                  <button
                    key={winnerId}
                    type="button"
                    onClick={() => setSelectedView(winnerId)}
                    className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                    }`}
                  >
                    {name}
                  </button>
                )
              })}
              {target && (
                <button
                  type="button"
                  onClick={() => setSelectedView(TARGET_VIEW)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                    activeView === TARGET_VIEW
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  Target reference
                </button>
              )}
            </>
          )}
        </div>

        {/* The stage is whatever room is left after the row above — grow +
            min-h-0 inside the capped page means this is always a real, known
            amount of space, never more than fits on screen. The frame inside
            is sized in JS to the largest 4:3 box (matching the target
            reference PNGs' own proportions) that fits within both 70% of the
            stage's width and the stage's full height, so it can never grow
            past the bottom of the screen. The winner render and the target
            image share this exact frame, so their displayed dimensions
            always match. Always rendered, even with no votes — that's just
            forced to the target view above, since there's nothing to
            toggle to. */}
        <div ref={stageRef} className="grow min-h-0 flex items-center justify-center">
          <div
            className="relative rounded-md overflow-hidden border-4 border-emerald-500 bg-slate-100 dark:bg-slate-900"
            style={
              previewSize
                ? { width: previewSize.width, height: previewSize.height }
                : { width: `${PREVIEW_MAX_WIDTH_FRACTION * 100}%`, aspectRatio: `${PREVIEW_ASPECT_RATIO}` }
            }
          >
            {activeView === TARGET_VIEW ? (
              target ? (
                <img
                  src={target.referenceImage}
                  alt="Target reference"
                  className="absolute inset-0 w-full h-full object-contain"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-500">No target for this round</div>
              )
            ) : activeSubmission ? (
              <SandboxFrame
                html={activeSubmission.html}
                title={`${playersById.get(activeWinnerId)?.name ?? 'winner'}'s submission`}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-500">No submission found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
