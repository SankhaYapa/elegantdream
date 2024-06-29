// ServiceDetail.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './serviceDetail.scss';
import { Navbar } from '../navbar/Navbar';

export const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    const fetchServiceAndGalleries = async () => {
      try {
        const serviceResponse = await axios.get(`http://localhost:8800/services/${id}`);
        const serviceData = serviceResponse.data;
        setService(serviceData);

        if (serviceData) {
          const galleriesResponse = await axios.get(`http://localhost:8800/gallery/service/${serviceData.title}`);

          setGalleries(galleriesResponse.data);
        }
      } catch (error) {
        console.error('Error fetching service and galleries:', error);
      }
    };

    fetchServiceAndGalleries();
  }, [id]);

  if (!service) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="service-detail-container">
        <div className="service-detail-cover" style={{ backgroundImage: `url("http://localhost:8800${service.imageUrl}")` }}>
           <h2>{service.title}</h2>
        </div>
        <div className="gallery-collection">
          {galleries.map((gallery, index) => (
            <div key={index} className="gallery-card">
              <img src={`http://localhost:8800${gallery.thumbnail}`} alt={gallery.name} />
              <span>{gallery.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


