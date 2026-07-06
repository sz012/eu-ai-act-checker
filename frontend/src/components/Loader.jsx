import { useEffect, useState } from 'react'

export default function Loader({ label = 'Loading…' }) {
  const [slow, setSlow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setSlow(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="loader" role="status">
      <div className="loader-bars" aria-hidden="true">
        <span /><span /><span /><span />
      </div>
      <p className="loader-label">{label}</p>
      {slow && (
        <p className="loader-hint">
          First visit can take up to a minute — the free server is waking up.
        </p>
      )}
    </div>
  )
}
