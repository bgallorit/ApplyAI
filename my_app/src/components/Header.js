import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <nav className="container navigation">
        {/* Logo */}
        <NavLink to="/" className="logo-link">
        <img src="/suitcase.svg" alt="Logo" style={{ height: '50px' }} />
        </NavLink>
        <div className="menu">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''} end>
            Find Jobs
          </NavLink>
          <NavLink to="/saved-jobs" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Saved Jobs
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active-link' : ''}>
            About
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;