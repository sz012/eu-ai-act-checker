import { Link } from 'react-router-dom'

// Screen 3 - overall risk badge, per-system cards, general obligations, disclaimer, download PDF
export default function ResultsPage() {
  return (
    <main className="page">
      <h1>Your results</h1>
      <p>the risk breakdown and obligations will appear here...</p>
      <Link to="/" className="btn-secondary">Start over</Link>
      <p className="disclaimer">
        This is an informational self-assessment, not legal advice.
      </p>
    </main>
  )
}
