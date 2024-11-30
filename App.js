import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import VoterPanel from './components/VoterPanel';
import Results from './components/Results'; // Corrected to match your component name
import './App.css'; // Import the CSS file for styling

//to run the code open two terminal one terminal for backend and type node server.js , open frontend terminal and type npm start

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1>Online Voting System</h1>
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/voter" element={<VoterPanel />} />
          <Route path="/results" element={<Results />} /> {/* Corrected to Results */}
        </Routes>
        <nav>
          <Link to="/admin">Admin Login</Link> | {' '}
          <Link to="/voter">Voter Login</Link> | {' '}
          <Link to="/results">View Results</Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;
