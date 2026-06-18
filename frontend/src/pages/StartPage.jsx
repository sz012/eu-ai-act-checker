import { useNavigate } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

// Screen 1 - short intro + start button + disclaimer
export default function StartPage() {
  const navigate = useNavigate()

  return (
    <main className="page">
      <div className="start-card">
        <ShieldCheck size={36} className="start-icon" />
        <h1>Check your company in 2 minutes</h1>
        <p>
          Answer 8 short questions about how your company uses AI and get back the
          EU AI Act risk level of each system, what you need to do, and a downloadable
          PDF report.
        </p>
        <button className="btn-primary" onClick={() => navigate('/questions')}>
          Check your company
        </button>
      </div>
      <p className="disclaimer">
        This is an informational self-assessment, not legal advice.
      </p>
    </main>
  )
}
