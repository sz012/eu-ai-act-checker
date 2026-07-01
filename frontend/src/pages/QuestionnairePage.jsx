import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchQuestions } from '../api'

// Screen 2 - the 8 questions, one at a time.
export default function QuestionnairePage() {
  const navigate = useNavigate()

  const [questions, setQuestions] = useState([])
  const [error, setError] = useState(null)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    fetchQuestions()
      .then(setQuestions)
      .catch(() => setError('Could not reach the server. Is the backend running?'))
  }, [])

  if (error) return <main className="page"><p>{error}</p></main>
  if (questions.length === 0) return <main className="page"><p>Loading…</p></main>

  const current = questions[index]
  const total = questions.length

  function answer(value) {
    const updated = { ...answers, [current.id]: value }
    setAnswers(updated)

    if (index + 1 < total) {
      setIndex(index + 1)
    } else {
      //encode answers into the URL so results are shareable and survive refresh
      const params = new URLSearchParams()
      const yes = Object.keys(updated).filter((id) => updated[id] === 'yes')
      const maybe = Object.keys(updated).filter((id) => updated[id] === 'not_sure')
      if (yes.length) params.set('y', yes.join(','))
      if (maybe.length) params.set('m', maybe.join(','))
      navigate(`/results?${params.toString()}`)
    }
  }

  return (
    <main className="page">
      <div className="progress-row">
        <span>Question {index + 1} of {total}</span>
        <span>{Math.round(((index + 1) / total) * 100)}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>

      <div className="question-body">
        <h1>{current.text}</h1>
        <p className="help">{current.help}</p>
      </div>

      <div className="answer-buttons">
        <button className="btn-secondary" onClick={() => answer('yes')}>Yes</button>
        <button className="btn-secondary" onClick={() => answer('not_sure')}>Not sure</button>
        <button className="btn-secondary" onClick={() => answer('no')}>No</button>
      </div>
    </main>
  )
}
