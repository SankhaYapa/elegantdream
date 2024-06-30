import React, { useEffect, useState } from 'react';
import "./gallery.scss";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/gallery`);
        setGallery(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      }
    };

    fetchGallery();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/gallery/${id}`);
  };

  return (
    <div className='main-gallery-container'>
      <span>Featured this year</span>
      {/* <span className='gallerydesc'>With a meticulous dedication to craftsmanship, we specialize in capturing the essence of beauty, authentic emotions, and magical moments that define your most cherished occasions. Our photography preserves these memories, ensuring you can revisit and savor every enchanting detail whenever you wish.</span> */}
      <div className="gallery-container">
        {gallery.map(item => (
          <div
            key={item._id}
            className="gallery-card"
            style={{ backgroundImage: `url("${BASE_URL}${item.thumbnail}")` }}
            onClick={() => handleCardClick(item._id)}
          >
            <div className="gallery-content">
              <h3>{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
