import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './serviceDetail.scss';
import { Navbar } from '../navbar/Navbar';
import { Footer } from '../footer/Footer';

export const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchServiceAndGalleries = async () => {
      try {
        const serviceResponse = await axios.get(`${BASE_URL}/api/services/${id}`);
        const serviceData = serviceResponse.data;
        setService(serviceData);

        if (serviceData) {
          const galleriesResponse = await axios.get(`${BASE_URL}/api/gallery/service/${serviceData.title}`);
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
        <div className="service-detail-cover" style={{ backgroundImage: `url("${BASE_URL}${service.imageUrl}")` }}>
          <h2>{service.title}</h2>
          <span>{service.tag}</span>
        </div>
        <div className="gallery-collection">
          {galleries.map((gallery) => (
            <div
              key={gallery._id}
              className="gallery-card"
              onClick={() => navigate(`/gallery/${gallery._id}`)}
            >
              <img src={`${BASE_URL}${gallery.thumbnail}`} alt={gallery.name} />
              <span>{gallery.name}</span>
            </div>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
