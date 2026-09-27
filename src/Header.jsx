import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { subscribeLobby } from './lib/lobby'
import { getPlayerId } from './lib/playerId'

// Header renders outside the <Routes> tree so it can't useParams(); pull the
// lobby code straight out of the pathname instead for whichever game screen
// is currently active.
function useLobbyCodeFromPath() {
  const { pathname } = useLocation()
  const match = pathname.match(/^\/(lobby|round|voting|results)\/([^/]+)/)
  return match ? match[2] : null
}

export default function Header() {
  const code = useLobbyCodeFromPath()
  const [lobby, setLobby] = useState(null)

  useEffect(() => {
    if (!code) {
      setLobby(null)
      return
    }
    const unsubscribe = subscribeLobby(code, setLobby)
    return unsubscribe
  }, [code])

  const playerId = getPlayerId()
  const selfName = lobby?.players?.find((p) => p.id === playerId)?.name

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-300 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4 px-6">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-sky-600 dark:text-sky-400 tracking-wide">
            CSScape
          </div>
          {selfName && (
            <span className="text-slate-500 dark:text-slate-400 text-sm relative top-[3px]">
              Playing as <span className="font-semibold text-slate-700 dark:text-slate-200">{selfName}</span>
            </span>
          )}
        </div>
        <nav className="flex gap-6">
          <Link to="/" className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 font-medium transition-colors">Home</Link>
          <Link to="/lobby" className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 font-medium transition-colors">Lobby</Link>
          {/* <Link to="/results" className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 font-medium transition-colors">Results</Link> */}
          <Link to="/vistool" className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 font-medium transition-colors">Vistool</Link>
        </nav>
      </div>
    </header>
  )
}
