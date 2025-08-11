import { useEffect, useState } from 'react'

const Bar = ({ label, value, max = 100, color = '#6366f1' }) => {
  const width = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12, color: '#4b5563' }}>
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div style={{ height: 8, background: '#edf2f7', borderRadius: 6 }}>
        <div style={{ width: `${width}%`, height: '100%', background: color, borderRadius: 6 }} />
      </div>
    </div>
  )
}

const PastResultsPage = () => {
  const [items, setItems] = useState([])

  const load = () => {
    try {
      const key = 'obesity_past_results'
      const data = JSON.parse(localStorage.getItem(key) || '[]')
      setItems(data)
    } catch {
      setItems([])
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleClearAll = () => {
    const key = 'obesity_past_results'
    localStorage.removeItem(key)
    setItems([])
  }

  if (items.length === 0) {
    return (
      <div className="card">
        <h1 className="page-title">Past Results</h1>
        <p className="page-subtitle">No saved runs yet. Complete an assessment to see your history here.</p>
      </div>
    )
  }

  return (
    <div className="card card-wide">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title" style={{ textAlign: 'left', marginBottom: 0 }}>Past Results</h1>
          <p className="page-subtitle" style={{ marginTop: 6 }}>Your last {items.length} run(s). We store up to 50 locally on this device.</p>
        </div>
        <button className="btn btn-secondary" onClick={handleClearAll}>Clear All</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        {items.map((run) => (
          <div key={run.id} className="image-card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontWeight: 700, color: '#111827' }}>{new Date(run.timestamp).toLocaleString()}</div>
              <div className={`risk-indicator ${run.likelihood > 60 ? 'risk-high' : run.likelihood > 30 ? 'risk-moderate' : 'risk-low'}`}>
                {run.risk} / {run.likelihood}%
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12, fontSize: 13, color: '#4b5563' }}>
              <div>BMI: <strong>{run.bmi}</strong></div>
              <div>Predicted BMI: <strong>{run.predictedBMI}</strong></div>
              <div>Gender: <strong>{run.inputs.gender}</strong></div>
              <div>Age: <strong>{run.inputs.age}</strong></div>
            </div>

            <Bar label="Likelihood" value={run.likelihood} max={100} />
            <Bar label="Activity (sessions/wk)" value={parseFloat(run.inputs.FAF)} max={7} color="#10b981" />
            <Bar label="Vegetables / day" value={parseFloat(run.inputs.FCVC)} max={5} color="#f59e0b" />
            <Bar label="Water (L/day)" value={parseFloat(run.inputs.CH2O)} max={4} color="#3b82f6" />

            {run.recommendations?.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, color: '#111827', marginBottom: 6 }}>Top Recommendations</div>
                <ul style={{ margin: 0, paddingLeft: 16, color: '#4b5563' }}>
                  {run.recommendations.slice(0, 3).map((r, idx) => (
                    <li key={idx}>{r.category}: {r.suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PastResultsPage 