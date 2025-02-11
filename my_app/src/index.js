import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App'; // Import the main App component
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'; // Import for React Router

const container = document.getElementById('root');
const root = createRoot(container); // Initializing the root

root.render(
  <React.StrictMode>
    <Router> {/* Ensures routing capabilities across the application */}
      <App />
    </Router>
  </React.StrictMode>
);

// Call the function to report web vitals
reportWebVitals();
