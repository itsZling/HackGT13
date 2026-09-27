// Renders untrusted player HTML/CSS in an isolated iframe. Never render
// player-submitted markup directly in the main DOM — always go through this.
//
// No sandbox flags are enabled (sandbox="" — most restrictive form). This is
// a CSS/HTML playground, not a JS one: submissions never need script
// execution, form submission, popups, or top-level navigation, so none of
// those permissions are granted. Do NOT add "allow-scripts" without also
// reconsidering "allow-same-origin" — that combination together lets a
// sandboxed frame script its way back out to the parent origin.
// The iframe fills its container via absolute positioning (inset-0), not a
// percentage height — the caller's container MUST have `relative` (and a
// resolved size of its own) for this to have something to fill. Two things
// that don't work reliably instead:
//   - iframe { height: 100% } directly: percentage heights on replaced
//     elements don't reliably resolve against a flex-grown ancestor across
//     browsers, leaving the iframe at its own short intrinsic height.
//   - wrapping the iframe in an extra `relative h-full` div: that div's own
//     height:100% can itself collapse to 0 depending on how many flex/percent
//     hops separate it from a truly definite height, silently blanking the
//     frame. Anchoring directly to the caller's own (already-sized) box skips
//     that hand-off entirely.
// className adds any extra styling on top (e.g. sandbox borders are the
// caller's job, not this component's — see each call site).
//
// `html` is the player's single combined editor field (markup + its own
// <style> block together) and is dropped into the body as-is — a <style>
// tag is valid there, so it doesn't need to be hoisted into <head> or
// concatenated with a separate CSS string.
export default function SandboxFrame({ html = '', title = 'submission preview', className = '' }) {
  const srcDoc = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>${html}</body>
</html>`

  return (
    <iframe
      title={title}
      srcDoc={srcDoc}
      sandbox=""
      className={`absolute inset-0 w-full h-full border-0 ${className}`}
    />
  )
}
