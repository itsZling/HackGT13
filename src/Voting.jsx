import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { subscribeLobby, advanceToResults } from './lib/lobby'
import { subscribeRound } from './lib/round'
import { subscribeSubmissions } from './lib/submission'
import { castVote, subscribeVotes } from './lib/vote'
import { getPlayerId } from './lib/playerId'
import SandboxFrame from './SandboxFrame'

export default function Voting() {
  const { code } = useParams()
  const navigate = useNavigate()
  const [lobby, setLobby] = useState(undefined)
  const [round, setRound] = useState(undefined)
  const [submissions, setSubmissions] = useState([])
  const [votes, setVotes] = useState([])
  const [error, setError] = useState('')
  const [now, setNow] = useState(() => Date.now())

  const playerId = getPlayerId()

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

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
  // satisfy this round's queries.
  useEffect(() => {
    if (!round?.roundKey) return
    return subscribeSubmissions(round.roundKey, setSubmissions)
  }, [round?.roundKey])

  useEffect(() => {
    if (!round?.roundKey) return
    return subscribeVotes(round.roundKey, setVotes)
  }, [round?.roundKey])

  // Same every-client-races-to-write, no-elected-writer pattern as Round's
  // round -> voting flip. Two independent triggers move on to results:
  // everyone's voted (no self-voting means exactly one vote per player is
  // expected, so that's votes.length reaching the player count), or the
  // 15s voting timer running out — forcing the tally through on whatever
  // votes exist so far, same as Round force-submits stragglers at endsAt.
  useEffect(() => {
    if (!lobby || !round) return
    if (lobby.status !== 'voting') return
    const playerCount = (lobby.players || []).length
    const everyoneVoted = playerCount > 0 && votes.length >= playerCount
    const timeUp = now >= round.votingEndsAt
    if (everyoneVoted || timeUp) {
      advanceToResults(code).catch((err) => setError(err.message))
    }
  }, [votes, lobby, round, now, code])

  useEffect(() => {
    if (lobby?.status === 'results') {
      navigate(`/results/${code}`)
    }
  }, [lobby?.status, code, navigate])

  if (lobby === undefined) {
    return (
      <div className="flex flex-col items-center justify-center grow p-8">
        <p>Loading voting...</p>
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
  const myVote = votes.find((v) => v.voterId === playerId)
  const myVoteFor = myVote?.votedForPlayerId
  const remainingSeconds = round ? Math.max(0, Math.ceil((round.votingEndsAt - now) / 1000)) : 0
  const timeUp = round ? now >= round.votingEndsAt : false

  async function handleVote(votedForPlayerId) {
    if (!round?.roundKey) return
    setError('')
    try {
      await castVote(round.roundKey, playerId, votedForPlayerId)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex flex-col grow w-full p-8 gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Vote for your favorite</h2>
        <div className="flex items-center gap-4">
          {round && (
            <p className={`text-xl font-mono font-bold ${timeUp ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-slate-100'}`}>
              {timeUp ? "Time's up" : `0:${String(remainingSeconds).padStart(2, '0')}`}
            </p>
          )}
          <p className="text-sm text-slate-600 dark:text-slate-400">Lobby: <span className="font-mono">{lobby.code}</span></p>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-md bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 grow min-h-0">
        {submissions.map((submission) => {
          const player = playersById.get(submission.playerId)
          const name = player?.name ?? 'Unknown player'
          const isOwnSubmission = submission.playerId === playerId
          const isSelected = myVoteFor === submission.playerId

          return (
            <div
              key={submission.playerId}
              className={`relative flex flex-col min-h-[240px] rounded-md overflow-hidden border bg-slate-100 dark:bg-slate-900 transition-colors ${
                isSelected
                  ? 'border-4 border-emerald-500'
                  : 'border border-slate-300 dark:border-slate-700'
              } ${isOwnSubmission ? 'opacity-90' : 'hover:border-emerald-400'}`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-sm font-bold shadow pointer-events-none">
                  ✓
                </div>
              )}
              <div className="px-3 py-2 text-sm font-medium border-b border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                {isOwnSubmission ? <strong>{name} (you — can't vote for yourself)</strong> : name}
              </div>
              <div className="relative grow min-h-0">
                <SandboxFrame html={submission.html} title={`${name}'s submission`} />
              </div>
              {/* Sits on top of the whole card, including the iframe — clicks
                  inside an iframe never bubble to the parent document, so
                  without this overlay only the header text was clickable. */}
              {!isOwnSubmission && (
                <button
                  type="button"
                  onClick={() => handleVote(submission.playerId)}
                  aria-label={`Vote for ${name}`}
                  className="absolute inset-0 cursor-pointer"
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
