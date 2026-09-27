// Pure vote-tallying logic — no Firestore, no React. Keeping it pure means it
// can be fed fake vote arrays and checked directly, before it's ever wired to
// a live round.

// playerId -> vote count.
export function countVotes(votes) {
  const counts = new Map()
  for (const vote of votes) {
    const id = vote.votedForPlayerId
    counts.set(id, (counts.get(id) || 0) + 1)
  }
  return counts
}

// Lines of code in a submission, used only to break a vote tie (see
// resolveWinners). Blank lines don't count as "code" so incidental
// whitespace can't tip a tie.
export function countLines(text) {
  return (text || '').split('\n').filter((line) => line.trim().length > 0).length
}

// Plurality winner(s) for a round, with the agreed tiebreak: among players
// tied for the most votes, whoever wrote the fewest lines of HTML+CSS wins
// outright; if their line counts are equal too, they're declared co-winners.
// Always returns an array — a single outright winner is an array of one, a
// tie (unbroken by votes or lines) is an array of several.
//
// `submissionsByPlayerId` maps playerId -> { html }.
export function resolveWinners(votes, submissionsByPlayerId) {
  const counts = countVotes(votes)
  if (counts.size === 0) return []

  const maxVotes = Math.max(...counts.values())
  const topVoted = [...counts.entries()]
    .filter(([, count]) => count === maxVotes)
    .map(([playerId]) => playerId)

  if (topVoted.length === 1) return topVoted

  const lineCounts = new Map(
    topVoted.map((playerId) => {
      const submission = submissionsByPlayerId[playerId]
      const lines = submission ? countLines(submission.html) : Infinity
      return [playerId, lines]
    })
  )

  const minLines = Math.min(...lineCounts.values())
  return topVoted.filter((playerId) => lineCounts.get(playerId) === minLines)
}
