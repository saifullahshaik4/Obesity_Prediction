import { useEffect } from 'react'
import { calculateObesityRisk } from '../utils/riskModel'

const ResultsPage = ({ userInputs, bmi }) => {
  if (!userInputs || !bmi) {
    return (
      <div className="card">
        <h1 className="page-title">No Data Available</h1>
        <p className="page-subtitle">Please complete the assessment first.</p>
      </div>
    )
  }

  const obesityRisk = calculateObesityRisk(userInputs, parseFloat(bmi))

  // Save once per unique run; avoid duplicates on reload
  useEffect(() => {
    try {
      const key = 'obesity_past_results'
      const existing = JSON.parse(localStorage.getItem(key) || '[]')

      const runKey = JSON.stringify({
        bmi: parseFloat(bmi),
        gender: userInputs.gender,
        age: userInputs.age,
        height: userInputs.height,
        weight: userInputs.weight,
        family_history_with_overweight: userInputs.family_history_with_overweight,
        FAVC: userInputs.FAVC,
        FCVC: userInputs.FCVC,
        NCP: userInputs.NCP,
        CAEC: userInputs.CAEC,
        SMOKE: userInputs.SMOKE,
        CH2O: userInputs.CH2O,
        SCC: userInputs.SCC,
        FAF: userInputs.FAF,
        TUE: userInputs.TUE,
        CALC: userInputs.CALC,
        MTRANS: userInputs.MTRANS,
      })

      const alreadySaved = existing.some((e) => e.runKey === runKey)
      if (!alreadySaved) {
        const entry = {
          id: `${Date.now()}`,
          runKey,
          timestamp: new Date().toISOString(),
          inputs: userInputs,
          bmi: parseFloat(bmi),
          predictedBMI: obesityRisk.predictedBMI,
          risk: obesityRisk.risk,
          likelihood: obesityRisk.likelihood,
          recommendations: obesityRisk.recommendations,
          riskFactors: obesityRisk.riskFactors,
          protectiveFactors: obesityRisk.protectiveFactors,
        }
        localStorage.setItem(key, JSON.stringify([entry, ...existing].slice(0, 50)))
      }
    } catch {}
  }, [userInputs, bmi, obesityRisk.predictedBMI, obesityRisk.risk, obesityRisk.likelihood])

  return (
    <div className="card">
      <h1 className="page-title">Your Results</h1>
      <p className="page-subtitle">
        BMI calculation and obesity risk assessment based on your lifestyle factors
      </p>

      {/* BMI Results */}
      <div className="result-card">
        <h2>Your BMI</h2>
        <div className="bmi-value">{bmi}</div>
        <div className="bmi-category">{userInputs.bmiCategory}</div>
        <div style={{ marginTop: '15px', fontSize: '14px', opacity: '0.9' }}>
          Height: {userInputs.height}cm | Weight: {userInputs.weight}kg
        </div>
      </div>

      {/* Obesity Risk Assessment */}
      <div className="prediction-section">
        <h3 className="section-title">Obesity Risk Assessment</h3>

        {userInputs.bmiCategory === 'Obese' ? (
          <div>
            <div className="risk-indicator risk-high">Current Status: Obese</div>
            <p style={{ marginTop: '15px' }}>
              Your current BMI indicates obesity. Focus on the recommendations below to improve your health.
            </p>
          </div>
        ) : (
          <div>
            <div className={`risk-indicator ${
              obesityRisk.risk === 'High' ? 'risk-high' : 
              obesityRisk.risk === 'Moderate' ? 'risk-moderate' : 'risk-low'
            }`}>
              Risk Level: {obesityRisk.risk}
            </div>
            <div className={`risk-indicator ${
              obesityRisk.likelihood > 60 ? 'risk-high' : 
              obesityRisk.likelihood > 30 ? 'risk-moderate' : 'risk-low'
            }`}>
              Likelihood: {obesityRisk.likelihood}%
            </div>

            <p style={{ marginTop: '15px' }}>
              Based on your lifestyle factors, our model predicts a BMI of {obesityRisk.predictedBMI} 
              with a {obesityRisk.likelihood}% likelihood of reaching obesity if current habits continue.
            </p>
          </div>
        )}

        {/* Risk Factors */}
        {obesityRisk.riskFactors.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#e53e3e', marginBottom: '10px' }}>Risk Factors:</h4>
            {obesityRisk.riskFactors.map((factor, index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                <strong>{factor.factor}</strong> ({factor.impact} impact): {factor.description}
              </div>
            ))}
          </div>
        )}

        {/* Protective Factors */}
        {obesityRisk.protectiveFactors.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#38a169', marginBottom: '10px' }}>Protective Factors:</h4>
            {obesityRisk.protectiveFactors.map((factor, index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                <strong>{factor.factor}</strong> ({factor.impact} impact): {factor.description}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommendations */}
      {obesityRisk.recommendations.length > 0 && (
        <div className="prediction-section">
          <h3 className="section-title">Personalized Recommendations</h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            {obesityRisk.recommendations.map((rec, index) => (
              <div key={index} style={{ 
                padding: '15px', 
                backgroundColor: '#f8f9ff', 
                borderRadius: '10px',
                borderLeft: '4px solid #667eea'
              }}>
                <h4 style={{ color: '#667eea', marginBottom: '5px' }}>{rec.category}</h4>
                <p style={{ marginBottom: '5px' }}>{rec.suggestion}</p>
                <small style={{ color: '#718096' }}>{rec.impact}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Model Information */}
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#f7fafc', 
        borderRadius: '10px',
        fontSize: '14px',
        color: '#718096'
      }}>
        <h4 style={{ color: '#4a5568', marginBottom: '10px' }}>About This Assessment</h4>
        <p>
          This assessment uses a linear regression model trained on lifestyle factors from 2,111 participants. 
          The model achieves 46.8% accuracy (R²) in predicting BMI based solely on lifestyle habits, 
          demonstrating that lifestyle factors play a significant role in obesity risk.
        </p>
      </div>
    </div>
  )
}

export default ResultsPage 