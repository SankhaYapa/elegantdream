import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './header.scss';

const Header = () => {
  const [headers, setHeaders] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    const fetchHeaders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/headers`);
        setHeaders(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching headers:', error);
      }
    };

    fetchHeaders();

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % headers.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, [headers.length]);

  if (headers.length === 0) {
    return <div>Loading...</div>; // Optionally, show a loading state
  }

  return (
    <div className="slide-container">
      {headers.map((header, index) => (
        <div
          key={index}
          className={`fade-image ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url("${BASE_URL}${header.images[0]}")` }}
        >
          <div className="caption">{header.caption}</div>
        </div>
      ))}
    </div>
  );
};

export default Header;
