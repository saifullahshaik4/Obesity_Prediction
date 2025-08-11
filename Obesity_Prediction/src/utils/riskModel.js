// Shared risk model utility derived from the notebook coefficients

export const modelCoefficients = {
  family_history_yes: 2.928,
  Age: 1.838,
  CAEC_encoded: 1.817,
  FCVC: 1.684,
  MTRANS_encoded: 1.652,
  FAF: -0.977,
  CALC_encoded: -0.912,
  FAVC_yes: 0.798,
  SCC_yes: -0.486,
  NCP: 0.390,
  CH2O: 0.375,
  TUE: -0.295,
  healthy_lifestyle_score: 0.375,
  Gender_Male: 0.162,
  SMOKE_yes: 0.123,
}

export const encodeCAEC = (caec) => {
  const mapping = { no: 0, Sometimes: 1, Frequently: 2, Always: 3 }
  return mapping[caec] ?? 0
}

export const encodeCALC = (calc) => {
  const mapping = { no: 0, Sometimes: 1, Frequently: 2, Always: 3 }
  return mapping[calc] ?? 0
}

export const encodeMTRANS = (mtrans) => {
  const mapping = {
    Walking: 0,
    Bike: 1,
    Motorbike: 2,
    Automobile: 3,
    Public_Transportation: 4,
  }
  return mapping[mtrans] ?? 0
}

export const calculateHealthyLifestyleScore = (inputs) => {
  const fcvc = parseFloat(inputs.FCVC)
  const faf = parseFloat(inputs.FAF)
  const ch2o = parseFloat(inputs.CH2O)

  const fcvcNorm = Math.max(0, Math.min(1, (fcvc - 0) / (3 - 0)))
  const fafNorm = Math.max(0, Math.min(1, (faf - 0) / (3 - 0)))
  const ch2oNorm = Math.max(0, Math.min(1, (ch2o - 1) / (3 - 1)))

  return ((fcvcNorm + fafNorm + ch2oNorm) / 3) * 100
}

export const buildFeatures = (inputs) => ({
  Age: parseFloat(inputs.age),
  FCVC: parseFloat(inputs.FCVC),
  NCP: parseFloat(inputs.NCP),
  CH2O: parseFloat(inputs.CH2O),
  FAF: parseFloat(inputs.FAF),
  TUE: parseFloat(inputs.TUE),
  Gender_Male: inputs.gender === 'Male' ? 1 : 0,
  family_history_yes: inputs.family_history_with_overweight === 'yes' ? 1 : 0,
  FAVC_yes: inputs.FAVC === 'yes' ? 1 : 0,
  SMOKE_yes: inputs.SMOKE === 'yes' ? 1 : 0,
  SCC_yes: inputs.SCC === 'yes' ? 1 : 0,
  CAEC_encoded: encodeCAEC(inputs.CAEC),
  CALC_encoded: encodeCALC(inputs.CALC),
  MTRANS_encoded: encodeMTRANS(inputs.MTRANS),
  healthy_lifestyle_score: calculateHealthyLifestyleScore(inputs),
})

export const predictBMIUsingModel = (inputs) => {
  const features = buildFeatures(inputs)
  let predictedBMI = 0
  for (const [feature, coefficient] of Object.entries(modelCoefficients)) {
    if (feature in features) {
      predictedBMI += features[feature] * coefficient
    }
  }
  return predictedBMI
}

const generateRecommendations = (inputs) => {
  const recs = []
  if (parseFloat(inputs.FAF) < 2) {
    recs.push({
      category: 'Physical Activity',
      suggestion: 'Increase physical activity to 3+ sessions per week',
      impact: 'Could reduce BMI by ~0.5–1.0 points',
    })
  }
  if (parseFloat(inputs.FCVC) < 2) {
    recs.push({
      category: 'Diet',
      suggestion: 'Increase vegetable consumption to 2–3 servings daily',
      impact: 'Supports healthy weight maintenance',
    })
  }
  if (inputs.FAVC === 'yes') {
    recs.push({
      category: 'Diet',
      suggestion: 'Reduce frequency of high‑calorie food consumption',
      impact: 'Could reduce BMI by ~0.3–0.8 points',
    })
  }
  if (parseFloat(inputs.CH2O) < 2) {
    recs.push({
      category: 'Hydration',
      suggestion: 'Increase daily water intake to 2+ liters',
      impact: 'Supports metabolism and satiety',
    })
  }
  if (inputs.SCC === 'no') {
    recs.push({
      category: 'Monitoring',
      suggestion: 'Start tracking calorie consumption',
      impact: 'Increases awareness and supports weight management',
    })
  }
  return recs
}

export const calculateObesityRisk = (inputs, currentBMI) => {
  const predictedBMI = predictBMIUsingModel(inputs)
  const riskFactors = []
  const protectiveFactors = []

  if (inputs.family_history_with_overweight === 'yes') {
    riskFactors.push({ factor: 'Family History', impact: 'High', description: 'Strong genetic predisposition' })
  }
  if (parseFloat(inputs.FAF) < 2) {
    riskFactors.push({ factor: 'Low Physical Activity', impact: 'Moderate', description: 'Less than 2 sessions per week' })
  } else if (parseFloat(inputs.FAF) >= 3) {
    protectiveFactors.push({ factor: 'Regular Exercise', impact: 'High', description: '3+ sessions per week' })
  }
  if (inputs.FAVC === 'yes') {
    riskFactors.push({ factor: 'High Caloric Food', impact: 'Moderate', description: 'Frequent consumption' })
  }
  if (parseFloat(inputs.FCVC) >= 2.5) {
    protectiveFactors.push({ factor: 'High Vegetable Intake', impact: 'Moderate', description: '2.5+ servings daily' })
  }
  if (parseFloat(inputs.age) > 35) {
    riskFactors.push({ factor: 'Age', impact: 'Low', description: 'Age‑related metabolic changes' })
  }

  const bmiDiff = predictedBMI - currentBMI
  let risk = 'Low'
  let likelihood = 0
  if (currentBMI >= 30) {
    risk = 'Already Obese'
    likelihood = 100
  } else if (currentBMI >= 25) {
    risk = 'High'
    likelihood = Math.min(85, 60 + bmiDiff * 10)
  } else if (predictedBMI >= 25 || bmiDiff > 2) {
    risk = 'Moderate'
    likelihood = Math.min(60, 30 + bmiDiff * 8)
  } else {
    likelihood = Math.max(5, Math.min(30, 15 + bmiDiff * 5))
  }

  return {
    predictedBMI: Number(predictedBMI.toFixed(1)),
    risk,
    likelihood: Math.round(Math.max(0, likelihood)),
    riskFactors,
    protectiveFactors,
    recommendations: generateRecommendations(inputs),
  }
} 