import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed

import '../styles/NavBar.css'; // Import your CSS file for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <Link to="/">
            <img src="path/to/logo.png" alt="Logo" className="logo-image" /> {/* Replace with your logo path */}
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/discounts" className="navbar-link">Discounts</Link>
          </li>
          <li className="navbar-item">
            <Link to="/store" className="navbar-link">Store</Link>
          </li>
          <li className="navbar-item">
            <Link to="/products" className="navbar-link">Products</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
