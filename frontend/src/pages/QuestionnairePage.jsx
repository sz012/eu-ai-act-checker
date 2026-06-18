import { useNavigate } from 'react-router-dom'

// Screen 2 - the 8 questions, one at a time
export default function QuestionnairePage() {
  const navigate = useNavigate()

  return (
    <main className="page">
      <h1>Questionnaire</h1>
      <p>The 8 questions will appear here, one at a time.</p>
      <button className="btn-primary" onClick={() => navigate('/results')}>
        See results
      </button>
    </main>
  )
}
