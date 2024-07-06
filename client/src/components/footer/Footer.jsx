import React from 'react';
import './footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faMailchimp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMailBulk, faMailReply, faPhone } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
  const handlePhoneClick = () => {
    window.location.href = 'tel:+94714154987'; // Replace with your phone number
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:chinthaka.photos.lk@gmail.com'; // Replace with your email
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <img src="/images/logo.png" alt="logo" />
          <p>
            Capture the essence of life's most precious moments with Elegant Dream Photography, where our passion for creativity and dedication to excellence ensure every photograph tells a story of beauty, emotion, and timeless elegance.
          </p>
        </div>

        <div className="footer-section menus">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/aboutus">About Us</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p onClick={handlePhoneClick}><FontAwesomeIcon icon={faPhone} size="1x" />  071 415 4987</p>
          <p onClick={handleEmailClick}><FontAwesomeIcon icon={faEnvelope} size="1x" />  chinthaka.photos.lk@gmail.com</p>
        </div>

        <div className="footer-section social media">
          <h2>Follow Us On</h2>
          <div className="social-icons">
            <a href="https://www.facebook.com/elegantdreamphotography?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="1x" /> Facebook
            </a>
            <a href="https://www.instagram.com/elegant_dream_photography?igsh=MXJ2cThzNjg1MmFidA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="1x" /> Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2024 Elegant Dream | All Rights Reserved
      </div>
    </footer>
  );
};
