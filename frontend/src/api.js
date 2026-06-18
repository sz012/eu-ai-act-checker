const API_BASE = 'http://127.0.0.1:8000'

export async function fetchQuestions() {
  const res = await fetch(`${API_BASE}/api/questions`)
  if (!res.ok) throw new Error('Failed to load questions')
  return res.json()
}

export async function postAssessment(answers) {
  const res = await fetch(`${API_BASE}/api/assess`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  })
  if (!res.ok) throw new Error('Assessment failed')
  return res.json()
}

export async function downloadPdf(answers) {
  const res = await fetch(`${API_BASE}/api/assess/pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  })
  if (!res.ok) throw new Error('PDF generation failed')

  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'ai-act-report.pdf'
  link.click()
  URL.revokeObjectURL(url)
}
