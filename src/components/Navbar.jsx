import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { FaChevronDown } from "react-icons/fa"; // Import dropdown arrow icon

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Navigation Links */}
        <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <li className="navbar-item">
            <Link to="/discounts" className="navbar-link">
              Discounts
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              <img src="path/to/logo.png" alt="Logo" className="logo-image" />{" "}
              {/* Replace with your logo path */}
            </Link>
          </li>
          <li className="navbar-item">
            <div className="navbar-link" onClick={toggleDropdown}>
              Store <FaChevronDown className="dropdown-arrow" />
              <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
                <Link to="/edit-store" className="dropdown-item">
                  Edit Store
                </Link>
                <Link to="/view-store" className="dropdown-item">
                  View Store
                </Link>
              </div>
            </div>
          </li>
          <li className="navbar-item">
            <Link to="/products" className="navbar-link">
              Products
            </Link>
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
