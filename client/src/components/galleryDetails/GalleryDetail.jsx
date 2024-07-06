import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './galleryDetail.scss';
import { Navbar } from '../navbar/Navbar';

export const GalleryDetail = () => {
  const { id } = useParams();
  const [galleryItem, setGalleryItem] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    const fetchGalleryItem = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/gallery/${id}`);
        setGalleryItem(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching gallery item:', error);
      }
    };
      
    fetchGalleryItem();
  }, [id]);
  const handleNavClick = (section) => {
    navigate("/", { state: { section } });
  };
  if (!galleryItem) return  <div className="loading-container">
  {/* <img src="http://localhost:5173/gif/preloader.gif" alt="Loading..." /> */}
</div>;

  return (
    <div>
          <Navbar handleNavClick={handleNavClick} />
    <div className="gallery-detail-container"  >
      <div className="gallery-detail-cover" style={{ backgroundImage: `url("${BASE_URL}${galleryItem.coverImg}")` }}>
      <h2>{galleryItem.name}</h2>
    
      <span>{galleryItem.service} </span>
      
      </div>
            
      <div className="image-collection">
        {galleryItem.images.map((image, index) => (
          <img key={index} src={`${BASE_URL}${image}`} alt={`Gallery ${index}`} />
        ))}
      </div>
    </div>
    </div>
 
  );
};
