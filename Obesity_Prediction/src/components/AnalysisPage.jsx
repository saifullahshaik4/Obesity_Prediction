const images = [
  { src: '/HeatGraph.png', title: 'Correlation Heatmap', desc: 'Shows pairwise relationships between lifestyle factors and BMI. Stronger colors indicate stronger relationships.' },
  { src: '/DistibutionAnalysis.png', title: 'Distribution Analysis', desc: 'Distributions of key variables like BMI, Age, Physical Activity, Water Intake.' },
  { src: '/ObesityCategories.png', title: 'Obesity Categories', desc: 'Counts and percentages for each obesity category in the dataset.' },
  { src: '/Lifestylefactors.png', title: 'Lifestyle vs BMI', desc: 'Scatter plots with trend lines showing how activity, vegetables, water and tech usage relate to BMI.' },
  { src: '/Categorical analysis.png', title: 'Categorical Analysis', desc: 'Average BMI across gender, family history, high-calorie food consumption and more.' },
  { src: '/BoxPlotCategories.png', title: 'Box Plots by Category', desc: 'BMI, activity, vegetables and tech usage distributions across obesity categories.' },
  { src: '/FeatureImportance.png', title: 'Feature Importance (Linear Regression)', desc: 'Model coefficients indicating how each factor changes BMI (positive increases, negative decreases).' },
  { src: '/ModelPerformance.png', title: 'Model Performance', desc: 'Predicted vs Actual plots and residuals showing model accuracy using lifestyle factors only.' },
]

const AnalysisPage = () => {
  return (
    <div className="card card-wide">
      <h1 className="page-title">Data Analysis & Insights</h1>
      <p className="page-subtitle">All charts generated in the notebook, presented with plain-English explanations.</p>

      <div className="image-grid">
        {images.map((img) => (
          <div className="image-card" key={img.src}>
            <img src={img.src} alt={img.title} />
            <div className="image-caption">
              <div className="image-title">{img.title}</div>
              <div className="image-desc">{img.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Simplified explanations from the notebook */}
      <div style={{ marginTop: 28 }} className="prediction-section">
        <div className="section-title">What the charts mean</div>
        <ul style={{ color: '#4b5563', lineHeight: 1.8, marginLeft: 18 }}>
          <li><strong>Correlation Heatmap</strong>: BMI is strongly tied to weight (expected). Beyond that, the strongest lifestyle links are: family history (moderate +), physical activity (weak −), calorie monitoring (weak −), high‑calorie foods (weak +), vegetable frequency (weak +), water intake (weak +), age (weak +), and technology use (weak −).</li>
          <li><strong>Distribution Analysis</strong>: BMI spans all categories; ages are 14–61; most people report 0–3 activity sessions/week and 1–3 liters of water/day.</li>
          <li><strong>Obesity Categories</strong>: Data is balanced across 7 labels. Shares from the notebook: Obesity Type I (16.6%), Type II (14.1%), Type III (15.3%), Overweight I (13.7%), Overweight II (13.7%), Normal (13.6%), Insufficient weight (12.9%).</li>
          <li><strong>Lifestyle vs BMI (scatter)</strong>: More physical activity ↘ BMI slightly; more vegetables shows a small positive correlation (likely confounded by other habits); water intake is slightly positive; tech time is slightly negative.</li>
          <li><strong>Categorical analysis</strong>: Higher BMI when: family history = yes, frequent high‑calorie food, lower activity. Gender and transport also matter modestly; walking and active transport trend lower.</li>
          <li><strong>Box plots</strong>: Obesity groups have higher BMI (by definition) and show lower activity and mixed eating patterns; there is notable spread, so lifestyle isn’t the only driver.</li>
        </ul>
      </div>

      <div className="prediction-section">
        <div className="section-title">Reference ranges</div>
        <div className="section-subtitle">Ranges used in this analysis (from the notebook and WHO)</div>
        <ul style={{ color: '#4b5563', lineHeight: 1.8, marginLeft: 18 }}>
          <li><strong>BMI categories</strong>: Underweight &lt; 18.5; Normal 18.5–24.9; Overweight 25.0–29.9; Obese ≥ 30.0.</li>
          <li><strong>WHO Obesity classes</strong> (dataset labels include Type I/II/III): Type I 30.0–34.9; Type II 35.0–39.9; Type III ≥ 40.0.</li>
          <li><strong>Activity level (sessions/week)</strong> used in notebook bins: Sedentary 0–1; Low 1–2; Moderate 2–3; High 3+.</li>
          <li style={{ color:'#6b7280' }}>Also used: Water intake levels — Low &lt; 1.5L; Adequate 1.5–2.5L; High &gt; 2.5L. Tech usage — Low 0–1h; Moderate 1–2h; High 2h+.</li>
        </ul>
      </div>

      <div className="prediction-section">
        <div className="section-title">Model results (lifestyle factors only)</div>
        <ul style={{ color: '#4b5563', lineHeight: 1.8, marginLeft: 18 }}>
          <li><strong>BMI prediction</strong>: R² = 0.468, RMSE ≈ 5.9, MAE ≈ 4.7. About 47% of BMI variation is explained by lifestyle + demographics (no height/weight used in features).</li>
          <li><strong>Weight prediction</strong>: R² = 0.476, RMSE ≈ 19.3, MAE ≈ 15.0.</li>
          <li><strong>Risk classification</strong>: Mapping predicted BMI into risk bands achieves ≈ 53% accuracy.</li>
          <li><strong>Segment accuracy</strong>: Accuracy varies by gender, age group, and activity level (e.g., better for females and adults 26–35 in the test split).</li>
          <li><strong>Prediction confidence</strong>: ≈ 95% of actuals fall within the 95% prediction interval; ≈ 69% within 1 RMSE for BMI.</li>
        </ul>
      </div>

      <div className="prediction-section">
        <div className="section-title">What drives BMI in our model</div>
        <div className="section-subtitle">Top coefficients from linear regression (direction → BMI change)</div>
        <ul style={{ color: '#4b5563', lineHeight: 1.8, marginLeft: 18 }}>
          <li><strong>Family history</strong> (+2.93): strongest risk factor we captured.</li>
          <li><strong>Age</strong> (+1.84), <strong>Eating between meals (CAEC)</strong> (+1.82), <strong>Vegetable frequency</strong> (+1.68, likely confounded), <strong>Transport mode</strong> (+1.65).</li>
          <li><strong>Physical activity (FAF)</strong> (−0.98) and <strong>Calorie monitoring (SCC)</strong> (−0.49) are protective; <strong>High‑calorie foods (FAVC)</strong> (+0.80) increases BMI.</li>
        </ul>
      </div>

      <div className="prediction-section">
        <div className="section-title">Business insights</div>
        <ul style={{ color: '#4b5563', lineHeight: 1.8, marginLeft: 18 }}>
          <li><strong>Who benefits</strong>: healthcare providers, wellness/fitness, nutrition services, insurers, and employers.</li>
          <li><strong>How it helps</strong>: early risk screening, targeted coaching, program ROI tracking, and population health reporting.</li>
          <li><strong>Key takeaway</strong>: Even without height/weight, lifestyle signals offer meaningful predictability and actionability.</li>
        </ul>
      </div>

      <div className="prediction-section">
        <div className="section-title">Limitations and how to improve R²</div>
        <ul style={{ color: '#4b5563', lineHeight: 1.8, marginLeft: 18 }}>
          <li><strong>Cross‑sectional data</strong>: shows association, not causation. Longitudinal tracking will help.</li>
          <li><strong>Scope</strong>: individual variation, environment, and socioeconomic context are under‑represented.</li>
          <li><strong>Improvements</strong>: add longitudinal data, socioeconomic + environmental variables, genetics/metabolic markers, sleep/stress, and wearable data streams.</li>
        </ul>
      </div>

      <div className="prediction-section">
        <div className="section-title">Economic impact (from notebook)</div>
        <ul style={{ color: '#4b5563', lineHeight: 1.8, marginLeft: 18 }}>
          <li>Overweight/obesity rate ≈ 73.5% in the dataset; large share of population could benefit from prevention.</li>
          <li>Plausible prevention programs can yield positive ROI when targeted at high‑risk groups identified by the model.</li>
        </ul>
      </div>

      <div className="prediction-section">
        <div className="section-title">Bottom line</div>
        <ul style={{ color: '#4b5563', lineHeight: 1.8, marginLeft: 18 }}>
          <li><strong>Answer to the research question</strong>: Yes — lifestyle factors can predict obesity/BMI with meaningful accuracy.</li>
          <li><strong>Action</strong>: Focus on increasing physical activity, monitoring calories, and reducing high‑calorie foods; tailor support for those with family history.</li>
        </ul>
      </div>

      <div style={{ marginTop: 28 }} className="prediction-section">
        <div className="section-title">Business Analysis</div>
        <div className="section-subtitle">Summary tailored for decision makers.</div>
        <ul style={{ color: '#4b5563', lineHeight: 1.8, marginLeft: 18 }}>
          <li>Who benefits: healthcare providers, insurers, wellness programs, employers.</li>
          <li>How it helps: early risk detection, targeted interventions, measurable outcomes.</li>
          <li>Data to add: socioeconomic, environment, genetic and longitudinal tracking to boost R².</li>
          <li>Key insights: family history is the strongest risk; consistent physical activity is protective.</li>
        </ul>
      </div>
    </div>
  )
}

export default AnalysisPage 