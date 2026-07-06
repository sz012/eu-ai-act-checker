import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Typewriter from '../components/Typewriter.jsx'
import { SCALE, SCALE_COLOR } from '../risk'

const WIDTHS = { minimal: '78px', limited: '116px', high: '148px', prohibited: '180px' }

const TITLE = 'Find out which AI Act rules apply to you.'
const LEDE =
  'Answer 8 short questions about how your company uses AI. Get your risk ' +
  'level, the obligations that follow, and a downloadable PDF report.'

// Screen 1 - editorial hero with an intro sequence:
export default function StartPage() {
  const navigate = useNavigate()
  const [titleDone, setTitleDone] = useState(false)

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-text">
          <h1 className="hero-title">
            <Typewriter text={TITLE} speed={32} caret onDone={() => setTitleDone(true)} />
          </h1>
          <p className={`hero-lede ${titleDone ? 'is-in' : 'is-waiting'}`}>{LEDE}</p>
          <div className={`hero-actions ${titleDone ? 'is-in' : 'is-waiting'}`}>
            <button className="btn-primary" onClick={() => navigate('/questions')}>
              Check your company <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="hero-motif">
          <div className="caption motif-item" style={{ animationDelay: '0.4s' }}>Risk scale</div>
          <ul className="scale-motif">
            {SCALE.map((tier, i) => (
              <li key={tier} className="motif-item" style={{ animationDelay: `${0.6 + i * 0.18}s` }}>
                <span
                  className="bar"
                  style={{
                    width: WIDTHS[tier],
                    background: SCALE_COLOR[tier],
                    animationDelay: `${0.6 + i * 0.18}s`,
                  }}
                />
                <span style={{ textTransform: 'capitalize' }}>{tier}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
