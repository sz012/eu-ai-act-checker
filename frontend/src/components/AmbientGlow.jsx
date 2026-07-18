import { useEffect, useRef, useState } from 'react'
import { PREFERS_REDUCED_MOTION } from '../prefersReducedMotion'

export default function AmbientGlow() {
  const spotRef = useRef(null)
  //intro fade in and out for stars - skipped entirely under reduced motion
  const [intro, setIntro] = useState(!PREFERS_REDUCED_MOTION)

  useEffect(() => {
    if (PREFERS_REDUCED_MOTION) return
    const timer = setTimeout(() => setIntro(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const el = spotRef.current
    if (!el) return
    if (PREFERS_REDUCED_MOTION) return

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
      pos.x += (target.x - pos.x) * 0.1
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
      <div className={`stars-reveal${intro ? ' stars-intro' : ''}`} aria-hidden="true" />
    </>
  )
}
