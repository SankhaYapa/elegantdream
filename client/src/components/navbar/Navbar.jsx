import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./navbar.scss";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="container">
      <div className="navbar">
        <div className="logo">
          <Link className="link" to="/">
            <img src="/images/logoblack.png" alt="logo" />
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="breadcrumb" onClick={toggleMenu}>
          <img src="/images/menu-bar.png" alt="menu" />
        </div>
        <div className="links-main">
          <span>Home</span>
          <span>Services</span>
          <span>About Us</span>
          <span>Explore Jobs</span>
        </div>
        <div className={`links ${menuOpen ? 'open' : ''}`}>
          <span className="close-btn" onClick={toggleMenu}>×</span>
          <span>Home</span>
          <span>Services</span>
          <span>About Us</span>
          <span>Explore Jobs</span>
        </div>
      </div>
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </div>
  );
};
