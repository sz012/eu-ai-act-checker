import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { postAssessment } from '../api'

const RISK_LABEL = {
  prohibited: 'Potentially prohibited',
  high: 'High risk',
  limited: 'Limited risk',
  minimal: 'Minimal risk',
  none: 'No AI systems found',
}

// Screen 3 - overall risk badge, per-system cards, general obligations, disclaimer.
export default function ResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const answers = location.state?.answers

  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!answers) {
      navigate('/')
      return
    }
    postAssessment(answers)
      .then(setResult)
      .catch(() => setError('Could not reach the server. Is the backend running?'))
  }, [answers, navigate])

  if (error) return <main className="page"><p>{error}</p></main>
  if (!result) return <main className="page"><p>Loading…</p></main>

  return (
    <main className="page">
      <p className="help">Overall risk level</p>
      <span className={`risk-badge risk-${result.overall_risk}`}>
        {RISK_LABEL[result.overall_risk]}
      </span>

      {result.no_ai_message && <p>{result.no_ai_message}</p>}

      {result.systems.length > 0 && (
        <>
          <h2 className="section-title">Your AI systems ({result.systems.length} found)</h2>
          {result.systems.map((sys) => (
            <div key={sys.id} className="system-card">
              <div className="system-head">
                <span>{sys.area}</span>
                <span className={`risk-pill risk-${sys.risk}`}>{sys.risk}</span>
              </div>
              <ul>
                {sys.obligations.map((o, i) => <li key={i}>{o}</li>)}
              </ul>
            </div>
          ))}
        </>
      )}

      {result.general_obligations.length > 0 && (
        <div className="general-box">
          <div className="general-title">Applies to everyone using AI</div>
          <ul>
            {result.general_obligations.map((o, i) => <li key={i}>{o}</li>)}
          </ul>
        </div>
      )}

      <div className="answer-buttons">
        <button className="btn-primary" disabled title="Coming in Step 4">
          Download PDF report
        </button>
        <Link to="/" className="btn-secondary">Start over</Link>
      </div>

      <p className="disclaimer">{result.disclaimer}</p>
    </main>
  )
}
