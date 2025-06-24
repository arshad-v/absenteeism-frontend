import { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://absenteeism-backend-1.onrender.com';

const PredictionPage = () => {
  const [formData, setFormData] = useState({
    Gender: '',
    City: '',
    JobTitle: '',
    DepartmentName: '',
    StoreLocation: '',
    BusinessUnit: '',
    Division: '',
    Age: '',
    LengthService: '',
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      const payload = {
        ...formData,
        Age: parseInt(formData.Age, 10),
        LengthService: parseInt(formData.LengthService, 10),
      };
      const res = await axios.post(`${API_URL}/predict`, payload);
      setPrediction(res.data);
    } catch (err) {
      setError('Prediction failed. Please check the inputs or API server.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clusterInfo = [
    { id: 0, title: 'Low Risk Employees', description: 'Employees with consistent attendance records and low predicted absenteeism hours.' },
    { id: 1, title: 'Moderate Risk Employees', description: 'Employees with some fluctuation in attendance; monitor and provide support as needed.' },
    { id: 2, title: 'High Risk Employees', description: 'Employees with higher probability of absenteeism; consider proactive engagement strategies.' },
    { id: 3, title: 'Very High Risk Employees', description: 'Employees with significant absenteeism risk; immediate intervention recommended.' },
  ];

  return (
    <>
      <section>
        <h2>Predict Absenteeism</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <label key={key}>
              {key.replace(/([A-Z])/g, ' $1').trim()}:
              <input
                type={key === 'Age' || key === 'LengthService' ? 'number' : 'text'}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                placeholder={`e.g., ${key === 'Age' ? '30' : '...'}`}
                required
              />
            </label>
          ))}
          <button type="submit" disabled={loading}>
            {loading ? 'Predicting...' : 'Predict Absenteeism'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {prediction && (
          <div id="result">
            <h3>Prediction Result</h3>
            <p><strong>Predicted Absent Hours:</strong> {prediction.predicted_hours.toFixed(2)} hours</p>
            <p><strong>Cluster:</strong> {prediction.cluster_name}</p>
          </div>
        )}
      </section>

      <section>
        <h2>Cluster Groups</h2>
        <div className="cluster-grid">
          {clusterInfo.map((cluster) => (
            <div
              key={cluster.id}
              className={`cluster-card ${prediction?.cluster_id === cluster.id ? 'active' : ''}`}>
              <h3>{cluster.title}</h3>
              <p>{cluster.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default PredictionPage;
