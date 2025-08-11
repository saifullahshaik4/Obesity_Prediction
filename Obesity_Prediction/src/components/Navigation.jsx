const Navigation = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="navigation">
      <div className="nav-logo">
        Obesity Prediction
      </div>
      <div className="nav-tabs">
        <button 
          className={`nav-tab ${currentPage === 'input' ? 'active' : ''}`}
          onClick={() => setCurrentPage('input')}
        >
          User Input
        </button>
        <button 
          className={`nav-tab ${currentPage === 'results' ? 'active' : ''}`}
          onClick={() => setCurrentPage('results')}
        >
          Results
        </button>
        <button 
          className={`nav-tab ${currentPage === 'analysis' ? 'active' : ''}`}
          onClick={() => setCurrentPage('analysis')}
        >
          Data Analysis
        </button>
        <button 
          className={`nav-tab ${currentPage === 'history' ? 'active' : ''}`}
          onClick={() => setCurrentPage('history')}
        >
          Past Results
        </button>
      </div>
    </nav>
  )
}

export default Navigation 