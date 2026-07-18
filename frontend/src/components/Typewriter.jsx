import { useEffect, useRef, useState } from 'react'
import { PREFERS_REDUCED_MOTION } from '../prefersReducedMotion'

// Typewriter effect
export default function Typewriter({ text, speed = 30, start = true, caret = false, onDone }) {
  //reduced motion - start already fully typed instead of fixing it in an effect
  const [count, setCount] = useState(() => (PREFERS_REDUCED_MOTION ? text.length : 0))

  const onDoneRef = useRef(onDone)
  useEffect(() => {
    onDoneRef.current = onDone
  })

  useEffect(() => {
    if (!start) return
    if (PREFERS_REDUCED_MOTION) {
      onDoneRef.current?.()
      return
    }
    const t0 = performance.now()
    const interval = setInterval(() => {
      const n = Math.min(text.length, Math.floor((performance.now() - t0) / speed))
      setCount(n)
      if (n >= text.length) {
        clearInterval(interval)
        onDoneRef.current?.()
      }
    }, Math.min(speed, 40))
    return () => clearInterval(interval)
  }, [start, text, speed])

  const typing = count < text.length

  return (
    <span className="typewriter">
      {/* ghost - reserves space */}
      <span className="type-ghost">{text}</span>
      {/* live - the visible, progressively typed copy */}
      <span className="type-live" aria-hidden="true">
        {text.slice(0, count)}
        {caret && start && typing && <span className="type-caret" />}
      </span>
    </span>
  )
}
