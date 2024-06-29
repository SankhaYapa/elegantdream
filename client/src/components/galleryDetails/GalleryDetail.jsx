import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './galleryDetail.scss';
import { Navbar } from '../navbar/Navbar';

export const GalleryDetail = () => {
  const { id } = useParams();
  const [galleryItem, setGalleryItem] = useState(null);

  useEffect(() => {
    const fetchGalleryItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/gallery/${id}`);
        setGalleryItem(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching gallery item:', error);
      }
    };

    fetchGalleryItem();
  }, [id]);

  if (!galleryItem) return  <div className="loading-container">
  {/* <img src="http://localhost:5173/gif/preloader.gif" alt="Loading..." /> */}
</div>;

  return (
    <div>
          <Navbar></Navbar>
    <div className="gallery-detail-container"  >
      <div className="gallery-detail-cover" style={{ backgroundImage: `url("http://localhost:8800${galleryItem.coverImg}")` }}>
      <h2>{galleryItem.name}</h2>
      <br />
      <span>{galleryItem.service} </span>
      </div>
     
      <div className="image-collection">
        {galleryItem.images.map((image, index) => (
          <img key={index} src={`http://localhost:8800${image}`} alt={`Gallery ${index}`} />
        ))}
      </div>
    </div>
    </div>
 
  );
};
