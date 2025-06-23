import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PredictionPage from './pages/PredictionPage';
import './style.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/predict" element={<PredictionPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
