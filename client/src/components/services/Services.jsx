import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './services.scss';
import { Link } from 'react-router-dom';

export const Services = () => {
  const [services, setServices] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/services`);
        setServices(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className='main-services-container'>
      <span>Our Services</span>
      <span className='servicedesc'>Each photograph we capture is a testament to our passion for storytelling, turning fleeting moments into timeless art that resonates with emotion and beauty</span>
      <div className="services-container">
        {services.length === 0 ? (
          Array.from({ length: 7 }).map((_, index) => (
            <div className='service-card'>
              <Skeleton key={index} height={'30vw'} width={'30vw'} className="service-card-img"/>
            </div>
            
          ))
        ) : (
          services.map(service => (
            <Link to={`/service/${service._id}`} key={service._id} style={{ textDecoration: 'none', color: 'black' }}>
              <div className='service-card'>
                <div className="service-card-img" style={{ backgroundImage: `url("${BASE_URL}${service.imageUrl}")` }}>
                </div>
                <span>{service.title}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
