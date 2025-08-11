import { useState } from 'react'

const InputPage = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    // Basic info
    gender: '',
    age: '',
    height: '',
    weight: '',
    
    // Lifestyle factors from the model
    family_history_with_overweight: '',
    FAVC: '', // Frequent consumption of high caloric food
    FCVC: '', // Frequency of consumption of vegetables
    NCP: '', // Number of main meals
    CAEC: '', // Consumption of food between meals
    SMOKE: '', // Smoking habit
    CH2O: '', // Consumption of water daily
    SCC: '', // Calories consumption monitoring
    FAF: '', // Physical activity frequency
    TUE: '', // Time using technology devices
    CALC: '', // Consumption of alcohol
    MTRANS: '' // Transportation used
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100 // Convert cm to meters
    return (weight / (heightInMeters * heightInMeters)).toFixed(1)
  }

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight'
    if (bmi < 25) return 'Normal Weight'
    if (bmi < 30) return 'Overweight'
    return 'Obese'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Calculate BMI
    const bmi = calculateBMI(parseFloat(formData.weight), parseFloat(formData.height))
    const bmiCategory = getBMICategory(parseFloat(bmi))
    
    // Prepare data for prediction model
    const processedData = {
      ...formData,
      bmi: parseFloat(bmi),
      bmiCategory,
      // Convert to model format
      heightInMeters: parseFloat(formData.height) / 100,
      weightInKg: parseFloat(formData.weight)
    }
    
    onSubmit(processedData)
  }

  const isFormValid = () => {
    const requiredFields = ['gender', 'age', 'height', 'weight', 'family_history_with_overweight', 
      'FAVC', 'FCVC', 'NCP', 'CAEC', 'SMOKE', 'CH2O', 'SCC', 'FAF', 'TUE', 'CALC', 'MTRANS']
    return requiredFields.every(field => formData[field] !== '')
  }

  return (
    <div className="card">
      <h1 className="page-title">Obesity Risk Assessment</h1>
      <p className="page-subtitle">
        Please provide your lifestyle information to assess your obesity risk and BMI
      </p>

      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="section-title">Basic Information</div>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Gender</label>
            <select 
              className="form-select" 
              name="gender" 
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Age (years)</label>
            <input 
              type="number" 
              className="form-input" 
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              min="14" 
              max="80"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Height (cm)</label>
            <input 
              type="number" 
              className="form-input" 
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              min="140" 
              max="220"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Weight (kg)</label>
            <input 
              type="number" 
              className="form-input" 
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              min="35" 
              max="200"
              step="0.1"
              required
            />
          </div>
        </div>

        {/* Family History */}
        <div className="section-title">Family History</div>
        <div className="form-grid">
          <div className="form-group full-width">
            <label className="form-label">Do you have a family history of overweight?</label>
            <select 
              className="form-select" 
              name="family_history_with_overweight"
              value={formData.family_history_with_overweight}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* Dietary Habits */}
        <div className="section-title">Dietary Habits</div>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Do you frequently consume high caloric food?</label>
            <select 
              className="form-select" 
              name="FAVC"
              value={formData.FAVC}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">How often do you eat vegetables? (times per day)</label>
            <input 
              type="number" 
              className="form-input" 
              name="FCVC"
              value={formData.FCVC}
              onChange={handleInputChange}
              min="0" 
              max="5"
              step="0.1"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Number of main meals per day</label>
            <input 
              type="number" 
              className="form-input" 
              name="NCP"
              value={formData.NCP}
              onChange={handleInputChange}
              min="1" 
              max="5"
              step="0.1"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Do you eat food between meals?</label>
            <select 
              className="form-select" 
              name="CAEC"
              value={formData.CAEC}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Option</option>
              <option value="no">No</option>
              <option value="Sometimes">Sometimes</option>
              <option value="Frequently">Frequently</option>
              <option value="Always">Always</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Daily water consumption (liters)</label>
            <input 
              type="number" 
              className="form-input" 
              name="CH2O"
              value={formData.CH2O}
              onChange={handleInputChange}
              min="0.5" 
              max="4"
              step="0.1"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Do you monitor your calorie consumption?</label>
            <select 
              className="form-select" 
              name="SCC"
              value={formData.SCC}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* Lifestyle Habits */}
        <div className="section-title">Lifestyle Habits</div>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Do you smoke?</label>
            <select 
              className="form-select" 
              name="SMOKE"
              value={formData.SMOKE}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Physical activity frequency (times per week)</label>
            <input 
              type="number" 
              className="form-input" 
              name="FAF"
              value={formData.FAF}
              onChange={handleInputChange}
              min="0" 
              max="7"
              step="0.1"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Time using technology devices (hours per day)</label>
            <input 
              type="number" 
              className="form-input" 
              name="TUE"
              value={formData.TUE}
              onChange={handleInputChange}
              min="0" 
              max="12"
              step="0.1"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Alcohol consumption frequency</label>
            <select 
              className="form-select" 
              name="CALC"
              value={formData.CALC}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Option</option>
              <option value="no">Never</option>
              <option value="Sometimes">Sometimes</option>
              <option value="Frequently">Frequently</option>
              <option value="Always">Always</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label className="form-label">Primary mode of transportation</label>
            <select 
              className="form-select" 
              name="MTRANS"
              value={formData.MTRANS}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Transportation</option>
              <option value="Walking">Walking</option>
              <option value="Bike">Bicycle</option>
              <option value="Motorbike">Motorbike</option>
              <option value="Automobile">Car</option>
              <option value="Public_Transportation">Public Transportation</option>
            </select>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={!isFormValid()}
          >
            Calculate BMI & Assess Risk
          </button>
        </div>
      </form>
    </div>
  )
}

export default InputPage 