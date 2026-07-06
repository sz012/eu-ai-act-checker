import { useEffect, useState } from 'react'

// Typewriter effect
export default function Typewriter({ text, speed = 30, start = true, caret = false, onDone }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    //accessibility
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(text.length)
      onDone?.()
      return
    }
    const t0 = performance.now()
    const interval = setInterval(() => {
      const n = Math.min(text.length, Math.floor((performance.now() - t0) / speed))
      setCount(n)
      if (n >= text.length) {
        clearInterval(interval)
        onDone?.()
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
