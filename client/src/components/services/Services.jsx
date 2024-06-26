import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './services.scss';

export const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8800/services');
        setServices(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className='main-services-container'>
      <span>Our Services</span>
      <div className="services-container">
        {services.map(service => (
          <div key={service._id} className='service-card'>
            <div  className="service-card-img" style={{ backgroundImage: `url("http://localhost:8800${service.imageUrl}")` }}>
           </div>
           <span>{service.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
