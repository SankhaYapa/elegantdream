import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './services.scss';
import { Link } from 'react-router-dom';

export const Services = () => {
  const [services, setServices] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/services`);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  // Function to toggle expansion
  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  // Slice services array based on expansion state
  const displayedServices = expanded ? services : services.slice(0, 5);

  return (
    <div className='main-services-container'>
      <span>Our Services</span>
      <span className='servicedesc'>Each photograph we capture is a testament to our passion for storytelling, turning fleeting moments into timeless art that resonates with emotion and beauty</span>
      <div className="services-container">
        {services.length === 0 ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div className='service-card' key={index}>
           <Skeleton className="service-card-img" />

            </div>
          ))
        ) : (
          displayedServices.map(service => (
            <Link to={`/service/${service._id}`} key={service._id} style={{ textDecoration: 'none', color: 'black' }}>
              <div className='service-card'>
                <div className="service-card-img" style={{ backgroundImage: `url("${BASE_URL}${service.imageUrl}")` }}>
                </div>
                <span>{service.title}</span>
              </div>
            </Link>
          ))
        )}
        {services.length > 5 && !expanded && (
          <div className='service-card view-all-card' >
            <div className='service-card-img-grid' onClick={toggleExpansion}>
              {services.slice(5, 9).map((service, index) => (
                <div key={index} className="grid-img" style={{ backgroundImage: `url("${BASE_URL}${service.imageUrl}")` }}></div>
              ))}
              {/* <div className="grid-img view-all">
                <span>View All</span>
              </div> */}
            </div>
            <span>More</span>
          </div>
        )}
      </div>
    </div>
  );
};
