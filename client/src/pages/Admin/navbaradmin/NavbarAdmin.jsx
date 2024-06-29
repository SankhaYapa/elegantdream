import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./navbarAdmin.scss";

export const NavbarAdmin = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="container">
      <div className="navbar">
        <div className="logo">
          <Link className="link" to="/adminpanel">
            <img src="/images/admin.png" alt="logo" />
          </Link>
          <span className="dot">Elegant Admin Panel</span>
        </div>
        <div className="breadcrumb" onClick={toggleMenu}>
          <img src="/images/menu-bar.png" alt="menu" />
        </div>
        <div className="links-main">
        </div>
        <div className={`links ${menuOpen ? 'open' : ''}`}>
          <span className="close-btn" onClick={toggleMenu}>×</span>
          <span>Admin Panel Menus</span>
          <nav className="dashboard-nav">
            <ul>
        <li><Link to="/adminpanel/gallerymanage">Manage Gallery</Link></li>
        <li><Link to="/adminpanel/servicesmanage">Manage Services</Link></li>
        <li><Link to="/adminpanel/headermanage">Manage Headers</Link></li>
          </ul>
         </nav>
        </div>
      </div>
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </div>
  );
};
