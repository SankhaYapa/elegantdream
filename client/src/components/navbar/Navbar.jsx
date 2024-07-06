import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.scss';

export const Navbar = ({ scrollToSection, headerRef, servicesRef, galleryRef, aboutUsRef }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Hook to get current location

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (ref) => {
    if (scrollToSection) {
      scrollToSection(ref);
    }
    setMenuOpen(false);  // Close the menu after clicking
  };

  return (
    <div className="container">
      <div className="navbar">
        <div className="logo">
          <Link className="link" to="/">
            <img src="/images/logoblack.png" alt="logo" />
          </Link>
        </div>
        <div className="breadcrumb" onClick={toggleMenu}>
          <img src="/images/menu-bar.png" alt="menu" />
        </div>
        <div className="links-main">
          
          {location.pathname === '/' ?
          <>
          <span onClick={() => handleNavClick(headerRef)}>Home</span> 
          <span onClick={() => handleNavClick(servicesRef)}>Services</span>
          <span onClick={() => handleNavClick(galleryRef)}>Explore Gallery</span>
          <span onClick={() => handleNavClick(aboutUsRef)}>About Us</span></> : (
            <>
            <Link className='Linkto' to="/">Home</Link>
            <Link className='Linkto' to="/services">Services</Link>
            <Link className='Linkto' to="/gallery">Explore Gallery</Link>
            <Link className='Linkto' to="/aboutus">About Us</Link>
            </>
          )}
        </div>
        <div className={`links ${menuOpen ? 'open' : ''}`}>
          <span className="close-btn" onClick={toggleMenu}>×</span>
          {location.pathname === '/' ?
          <>
          <span onClick={() => handleNavClick(headerRef)}>Home</span> 
          <span onClick={() => handleNavClick(servicesRef)}>Services</span>
          <span onClick={() => handleNavClick(galleryRef)}>Explore Gallery</span>
          <span onClick={() => handleNavClick(aboutUsRef)}>About Us</span></> : (
            <>
            <Link className='Linkto' to="/">Home</Link>
            <Link className='Linkto' to="/services">Services</Link>
            <Link className='Linkto' to="/gallery">Explore Gallery</Link>
            <Link className='Linkto' to="/aboutus">About Us</Link>
            </>
          )}
        </div>
      </div>
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </div>
  );
};
