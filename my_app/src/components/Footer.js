import React from 'react';
import './Footer.css';
// Import icons from a library like react-icons if needed
// import { FaLinkedin } from 'react-icons/fa';
// Import Link if using React Router
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Grad Job Search Engine. All rights reserved.</p>
        
        <nav className="footer-nav">
          <Link to="/about">About Us</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="social-links">
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            {/* <FaLinkedin /> */}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;