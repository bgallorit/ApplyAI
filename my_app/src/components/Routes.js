// Import necessary components
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import App from './App';  // Assuming App.js includes the job listings
import About from './components/About';
import SavedJobs from './components/SavedJobs';

const RoutesComponent = () => {
  return (
    <Router>
      <Header /> {/* Site-wide header component */}
      <Routes>
        <Route path="/" element={<App />} /> {/* Home page route, using App as the main page */}
        <Route path="/about" element={<About />} /> {/* About page route */}
        <Route path="/saved-jobs" element={<SavedJobs />} /> {/* Saved jobs page route */}
        {/* Add other routes as needed */}
      </Routes>
      <Footer /> {/* Site-wide footer component */}
    </Router>
  );
};

export default RoutesComponent;
