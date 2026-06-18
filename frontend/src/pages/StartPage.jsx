import { useNavigate } from 'react-router-dom'

// Screen 1 - short intro + start button + disclaimer
export default function StartPage() {
  const navigate = useNavigate()

  return (
    <main className="page">
      <h1>EU AI Act Checker</h1>
      <p>
        Answer 8 short questions about how your company uses AI and get back the
        EU AI Act risk level of each system, what you need to do, and a downloadable
        report.
      </p>
      <button className="btn-primary" onClick={() => navigate('/questions')}>
        Check your company
      </button>
      <p className="disclaimer">
        This is an informational self-assessment, not legal advice.
      </p>
    </main>
  )
}
