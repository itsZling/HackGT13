import { useEffect } from 'react'

// Generic overlay modal: renders children on top of whatever page mounted it
// (no navigation involved), dismissible via the close button, a backdrop
// click, or Escape. Content is expected to manage its own layout/scrolling.
export default function Modal({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    // Lock the page behind the overlay so only the modal's own content
    // scrolls — otherwise the backdrop's fixed positioning still leaves the
    // underlying page scrollable, producing a second, independent scrollbar.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl h-[calc(100vh-73px)] bg-white dark:bg-slate-950 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition-colors"
        >
          &times;
        </button>
        {/* No scroll wrapper here: the mounted content (e.g. Vistool) manages
            its own internal scroll regions already, matching how it scrolls
            on its own route — wrapping it in another overflow-auto container
            would give it two nested scrollbars for the same content. */}
        <div className="grow overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
