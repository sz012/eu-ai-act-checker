import { useEffect, useRef } from 'react'

// A large, soft warm light that follows the cursor (with easing), over a faint
// static base so the corners are never dead. Big + soft = reads as lighting the
// page, not a dot chasing the pointer.
export default function AmbientGlow() {
  const spotRef = useRef(null)

  useEffect(() => {
    const el = spotRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.4 }
    const pos = { ...target }

    function onMove(e) {
      target.x = e.clientX
      target.y = e.clientY
    }
    window.addEventListener('pointermove', onMove)

    let raf = 0
    function loop() {
      pos.x += (target.x - pos.x) * 0.1 // easing → smooth trailing motion
      pos.y += (target.y - pos.y) * 0.1
      el.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="ambient-base" aria-hidden="true" />
      <div ref={spotRef} className="ambient-spot" aria-hidden="true" />
    </>
  )
}
