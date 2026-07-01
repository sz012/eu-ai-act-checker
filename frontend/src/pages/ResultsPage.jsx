import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ShieldAlert, AlertTriangle, Info, CircleCheck, Minus, Download } from 'lucide-react'
import { postAssessment, downloadPdf } from '../api'

const RISK_LABEL = {
  prohibited: 'Potentially prohibited',
  high: 'High risk',
  limited: 'Limited risk',
  minimal: 'Minimal risk',
  none: 'No AI systems found',
}

const RISK_ICON = {
  prohibited: ShieldAlert,
  high: AlertTriangle,
  limited: Info,
  minimal: CircleCheck,
  none: Minus,
}

// Screen 3 - overall risk badge, per-system cards, general obligations, disclaimer.
export default function ResultsPage() {
  const [searchParams] = useSearchParams()
  const search = searchParams.toString()

  //URL: ?y=<yes ids>&m=<not_sure ids>.
  const answers = useMemo(() => {
    const params = new URLSearchParams(search)
    const built = {}
    ;(params.get('y') || '').split(',').filter(Boolean).forEach((id) => { built[id] = 'yes' })
    ;(params.get('m') || '').split(',').filter(Boolean).forEach((id) => { built[id] = 'not_sure' })
    return built
  }, [search])

  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [downloading, setDownloading] = useState(false)

  async function handleDownload() {
    setDownloading(true)
    try {
      await downloadPdf(answers)
    } catch {
      setError('Could not generate the PDF.')
    } finally {
      setDownloading(false)
    }
  }

  useEffect(() => {
    postAssessment(answers)
      .then(setResult)
      .catch(() => setError('Could not reach the server. Is the backend running?'))
  }, [answers])

  if (error) return <main className="page"><p>{error}</p></main>
  if (!result) return <main className="page"><p>Loading…</p></main>

  const BadgeIcon = RISK_ICON[result.overall_risk]

  return (
    <main className="page">
      <p className="help">Overall risk level</p>
      <span className={`risk-badge risk-${result.overall_risk}`}>
        <BadgeIcon size={20} />
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
        <button className="btn-primary" onClick={handleDownload} disabled={downloading}>
          <Download size={16} />
          {downloading ? 'Preparing…' : 'Download PDF report'}
        </button>
        <Link to="/" className="btn-secondary">Start over</Link>
      </div>

      <p className="disclaimer">{result.disclaimer}</p>
    </main>
  )
}
