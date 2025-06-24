import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
          Absenteeism AI
        </NavLink>

        {/* Hamburger Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Navigation Menu */}
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')} 
              onClick={closeMobileMenu}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/predict" 
              className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')} 
              onClick={closeMobileMenu}
            >
              Predict
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
