import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Download } from 'lucide-react'
import { postAssessment, downloadPdf } from '../api'
import { RISK_LABEL, SCALE, SCALE_COLOR, RISK_TEXT } from '../risk'

const TODAY = new Date().toLocaleDateString('en-GB', {
  day: '2-digit', month: 'short', year: 'numeric',
})

// Screen 3 - report layout: verdict + risk scale, system rows, general obligations.
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

  const activeIndex = SCALE.indexOf(result.overall_risk)

  return (
    <main className="page">
      <div className="report-meta">
        <span>EU AI Act · self-assessment</span>
        <span className="mono">{TODAY}</span>
      </div>

      <div className="verdict">
        <div className="caption">Overall assessment</div>
        <div className="verdict-title">{RISK_LABEL[result.overall_risk]}</div>

        <div className="risk-scale">
          {SCALE.map((tier, i) => (
            <div
              key={tier}
              className="seg"
              style={{ background: i <= activeIndex ? SCALE_COLOR[tier] : undefined }}
            />
          ))}
        </div>
        <div className="risk-scale-labels">
          {SCALE.map((tier, i) => (
            <span key={tier} className={i === activeIndex ? 'active' : undefined} style={{ textTransform: 'capitalize' }}>
              {tier}{i === activeIndex ? ' ◆' : ''}
            </span>
          ))}
        </div>
      </div>

      {result.no_ai_message && <p className="help">{result.no_ai_message}</p>}

      {result.systems.length > 0 && (
        <section>
          <div className="section-label">Your AI systems — {result.systems.length} found</div>
          {result.systems.map((sys) => (
            <div key={sys.id} className="sys-row" style={{ borderLeftColor: SCALE_COLOR[sys.risk] }}>
              <div className="sys-head">
                <span className="sys-area">{sys.area}</span>
                <span className="sys-risk" style={{ color: RISK_TEXT[sys.risk] }}>{sys.risk}</span>
              </div>
              {sys.obligations.length > 0 && (
                <ul className="sys-obl">
                  {sys.obligations.map((o, i) => <li key={i}>{o}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {result.general_obligations.length > 0 && (
        <section>
          <div className="section-label">Applies to everyone using AI</div>
          <ul className="general-list">
            {result.general_obligations.map((o, i) => <li key={i}>{o}</li>)}
          </ul>
        </section>
      )}

      <div className="actions">
        <button className="btn-primary" onClick={handleDownload} disabled={downloading}>
          <Download size={16} />
          {downloading ? 'Preparing…' : 'Download report'}
        </button>
        <Link to="/" className="btn-secondary">Start over</Link>
      </div>
    </main>
  )
}
