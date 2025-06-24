import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.navbar-container')) {
        closeMobileMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <NavLink 
          to="/" 
          className="navbar-logo" 
          onClick={closeMobileMenu}
          aria-label="Absenteeism AI - Home"
        >
          Absenteeism AI
        </NavLink>

        {/* Ultra Modern Hamburger Icon */}
        <div 
          className={`menu-icon ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleMenu();
            }
          }}
        >
          <div className="bar" aria-hidden="true"></div>
          <div className="bar" aria-hidden="true"></div>
          <div className="bar" aria-hidden="true"></div>
        </div>

        {/* Ultra Modern Navigation Menu */}
        <ul 
          className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}
          role="navigation"
          aria-label="Main navigation"
        >
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')} 
              onClick={closeMobileMenu}
              aria-label="Go to Dashboard"
            >
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/predict" 
              className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')} 
              onClick={closeMobileMenu}
              aria-label="Go to Prediction page"
            >
              <span>Predict</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;