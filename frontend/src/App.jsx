import { Routes, Route } from 'react-router-dom'
import StartPage from './pages/StartPage.jsx'
import QuestionnairePage from './pages/QuestionnairePage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/questions" element={<QuestionnairePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </div>
  )
}
