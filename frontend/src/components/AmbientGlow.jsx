import { useEffect, useRef } from 'react'

export default function AmbientGlow() {
  const spotRef = useRef(null)

  useEffect(() => {
    const el = spotRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = document.documentElement
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
      root.style.setProperty('--mx', `${pos.x}px`)
      root.style.setProperty('--my', `${pos.y}px`)
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
      <div className="stars-reveal" aria-hidden="true" />
    </>
  )
}
