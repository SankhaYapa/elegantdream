import React from 'react';
import './aboutus.scss';

export const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h2>About Us</h2>
        <p>
          Welcome to Elegant Dream Photography, where we turn your moments into timeless memories. Our team of dedicated professionals is passionate about capturing the beauty and essence of every occasion. From weddings to portraits, we offer a wide range of photography services tailored to meet your unique needs.
        </p>
        <p>
          At Elegant Dream Photography, we believe that every picture tells a story. We strive to create a comfortable and enjoyable experience for our clients, ensuring that every session is both fun and memorable. Our commitment to excellence and attention to detail set us apart, making us the perfect choice for your photography needs.
        </p>
        <p>
          Thank you for choosing Elegant Dream Photography. We look forward to capturing your special moments and creating beautiful, lasting memories.
        </p>
      </div>
      <div className="about-us-image">
        <img src="/images/aboutus.jpg" alt="About Us" />
      </div>
    </div>
  );
};
