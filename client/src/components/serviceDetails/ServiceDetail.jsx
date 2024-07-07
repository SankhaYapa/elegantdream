import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './serviceDetail.scss';
import { Navbar } from '../navbar/Navbar';
import { Footer } from '../footer/Footer';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

export const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [images, setImages] = useState([]);
  const [openedImage, setOpenedImage] = useState(null); // State to track opened image URL
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceAndGalleries = async () => {
      try {
        const serviceResponse = await axios.get(`${BASE_URL}/api/services/${id}`);
        const serviceData = serviceResponse.data;
        setService(serviceData);
        
        if (serviceData) {
          const galleriesResponse = await axios.get(`${BASE_URL}/api/gallery/service/${serviceData.title}`);
          const galleries = galleriesResponse.data;
          
          const allImages = galleries.reduce((acc, gallery) => {
            return [...acc, ...gallery.images];
          }, []);
          
          setImages(allImages);
        }
      } catch (error) {
        console.error('Error fetching service and galleries:', error);
      }
    };

    fetchServiceAndGalleries();
  }, [id]);

  const handleNavClick = (section) => {
    navigate('/', { state: { section } });
  };

  const viewImage = (image) => {
    setOpenedImage(image); // Set the opened image URL
  };

  const closeImageView = () => {
    setOpenedImage(null); // Reset opened image URL to close the view
  };

  if (!service) return (
    <div className="loading-container">
      {/* <img src="http://localhost:5173/gif/preloader.gif" alt="Loading..." /> */}
    </div>
  );

  return (
    <div>
      <Navbar handleNavClick={handleNavClick} />
      <div className="gallery-detail-container">
      <div className="gallery-detail-cover" style={{ backgroundImage: `url("${BASE_URL}${service.imageUrl}")` }}>
          <h2>{service.title}</h2>
          <span>{service.tag}</span>
        </div>
        <div style={{ padding: '10px'}}>
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 3 }}>
            <Masonry gutter='10px'>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={`${BASE_URL}${image}`}
                  alt={`Gallery ${index}`}
                  className="gallery-image"
                  onClick={() => viewImage(`${BASE_URL}${image}`)}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
      <Footer />
      {openedImage && (
        <div className="image-view-modal" onClick={closeImageView}>
          <div className="image-view-content">
            <img src={openedImage} alt="Opened Image" />
          </div>
        </div>
      )}
    </div>
  );
};
