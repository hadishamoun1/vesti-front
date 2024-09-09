import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; 

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
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
        
        {/* Hamburger Menu Icon */}
        <div className="navbar-hamburger">
          <button className="hamburger-icon" onClick={toggleMenu}>
            &#9776;
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
