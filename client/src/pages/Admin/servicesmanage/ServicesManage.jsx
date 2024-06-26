import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './servicesManage.scss';

export const ServicesManage = () => {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:8800/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const addService = async () => {
    console.log("first")
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    console.log(formData)
    try {
      const response = await axios.post('http://localhost:8800/services', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setServices([...services, response.data]);
      setTitle('');
      setImage(null);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const deleteService = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/services/${id}`);
      setServices(services.filter((service) => service._id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <div className="services-manage-container">
      <h2>Manage Services</h2>
      <div className="add-service-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button onClick={addService}>Add Service</button>
      </div>
      <div className="services-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td>{service.title}</td>
                <td>
                  <img src={`http://localhost:8800${service.imageUrl}`} alt={service.title} width="50" />
                </td>
                <td>
                  <button onClick={() => deleteService(service._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
