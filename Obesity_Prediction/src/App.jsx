import { useState } from 'react'
import './App.css'
import InputPage from './components/InputPage'
import ResultsPage from './components/ResultsPage'
import AnalysisPage from './components/AnalysisPage'
import PastResultsPage from './components/PastResultsPage'
import Navigation from './components/Navigation'

function App() {
  const [currentPage, setCurrentPage] = useState('input')
  const [userInputs, setUserInputs] = useState({})
  const [bmiResult, setBmiResult] = useState(null)

  const handleInputSubmit = (inputs) => {
    setUserInputs(inputs)
    setBmiResult(inputs.bmi)
    setCurrentPage('results')
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'input':
        return <InputPage onSubmit={handleInputSubmit} />
      case 'results':
        return <ResultsPage userInputs={userInputs} bmi={bmiResult} />
      case 'analysis':
        return <AnalysisPage />
      case 'history':
        return <PastResultsPage />
      default:
        return <InputPage onSubmit={handleInputSubmit} />
    }
  }

  return (
    <div className="app">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {renderCurrentPage()}
      </main>
    </div>
  )
}

export default App
