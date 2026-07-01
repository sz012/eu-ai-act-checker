import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SCALE, SCALE_COLOR } from '../risk'

const WIDTHS = { minimal: '78px', limited: '116px', high: '148px', prohibited: '180px' }

// Screen 1 - editorial hero
export default function StartPage() {
  const navigate = useNavigate()

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-text">
          <h1 className="hero-title">Find out which AI Act rules apply to you.</h1>
          <p className="hero-lede">
            Answer 8 short questions about how your company uses AI. Get your risk
            level, the obligations that follow, and a downloadable PDF report.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/questions')}>
              Check your company <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="hero-motif">
          <div className="caption">Risk scale</div>
          <ul className="scale-motif">
            {SCALE.map((tier) => (
              <li key={tier}>
                <span className="bar" style={{ width: WIDTHS[tier], background: SCALE_COLOR[tier] }} />
                <span style={{ textTransform: 'capitalize' }}>{tier}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className="disclaimer">This is an informational self-assessment, not legal advice.</p>
    </main>
  )
}
