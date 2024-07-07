import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router-dom';
import "./gallery.scss";

export const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/gallery`);
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
      {location.pathname === '/' ? 
        <span>Featured this year</span> :
        <>
          <span>All Galleries</span>
          <span className='gallerydesc'>Discover the artistry in every frame, where moments become timeless stories of beauty and emotion.</span>
        </>
      }
      <div className="gallery-container">
        {gallery.length === 0 ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="gallery-card">
              <Skeleton height={'60vw'} width={'45vw'} />
            </div>
          ))
        ) : (
          gallery.map(item => (
            <div
              key={item._id}
              className="gallery-card"
              style={{ backgroundImage: `url("${BASE_URL}${item.thumbnail}")` }}
              onClick={() => handleCardClick(item._id)}
            >
              {/* <div className="gallery-content">
                <h3>{item.name}</h3>
              </div> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
