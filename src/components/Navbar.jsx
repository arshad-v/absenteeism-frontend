import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          Absenteeism AI
        </NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}>
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/predict" className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}>
              Predict
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
