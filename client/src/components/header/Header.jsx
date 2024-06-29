import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './header.scss';

const Header = () => {
  const [headers, setHeaders] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchHeaders = async () => {
      try {
        const response = await axios.get('http://localhost:8800/headers');
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
          style={{ backgroundImage: `url("http://localhost:8800${header.images[0]}")` }}
        >
          <div className="caption">{header.caption}</div>
        </div>
      ))}
    </div>
  );
};

export default Header;
