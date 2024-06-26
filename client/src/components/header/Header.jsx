import React, { useState, useEffect } from 'react';
import './header.scss';

const fadeImages = [
  {
    url: '/images/slide1.jpg',
    caption: 'Capture your moments with our professional photography services.'
  },
  {
    url: '/images/slide1.jpg',
    caption: 'Create stunning videos with our expert videography team.'
  },
  {
    url: '/images/slide1.jpg',
    caption: 'Enjoy fun moments with our photo booth services for events.'
  },
];

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % fadeImages.length);
    }, 6000); // Change image every 3 seconds

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="slide-container">
      {fadeImages.map((fadeImage, index) => (
        <div
          key={index}
          className={`fade-image ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${fadeImage.url})` }}
        >
          <div className="caption">{fadeImage.caption}</div>
        </div>
      ))}
    </div>
  );
};

export default Header;
