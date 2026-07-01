import { Routes, Route } from 'react-router-dom'
import AmbientGlow from './components/AmbientGlow.jsx'
import Header from './components/Header.jsx'
import StartPage from './pages/StartPage.jsx'
import QuestionnairePage from './pages/QuestionnairePage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'

export default function App() {
  return (
    <div className="app">
      <AmbientGlow />
      <Header />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/questions" element={<QuestionnairePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </div>
  )
}
