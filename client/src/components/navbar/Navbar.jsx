import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';

export const Navbar = ({ scrollToSection,headerRef, servicesRef, galleryRef,aboutUsRef }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (ref) => {
    scrollToSection(ref);
    setMenuOpen(false);  // Close the menu after clicking
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
          <span onClick={() => handleNavClick(headerRef)}>Home</span>
          <span onClick={() => handleNavClick(servicesRef)}>Services</span>
          <span onClick={() => handleNavClick(galleryRef)}>Explore Gallery</span>
          <span onClick={() => handleNavClick(aboutUsRef)}>About Us</span>

         
        </div>
        <div className={`links ${menuOpen ? 'open' : ''}`}>
          <span className="close-btn" onClick={toggleMenu}>×</span>
          <span onClick={() => handleNavClick(headerRef)}>Home</span>
          <span onClick={() => handleNavClick(servicesRef)}>Services</span>
          <span onClick={() => handleNavClick(galleryRef)}>Explore Gallery</span>
          <span onClick={() => handleNavClick(aboutUsRef)}>About Us</span>
         
        </div>
      </div>
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </div>
  );
};
