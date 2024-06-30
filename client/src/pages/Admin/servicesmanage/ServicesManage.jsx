import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './servicesManage.scss';
import { NavbarAdmin } from '../navbaradmin/NavbarAdmin';

Modal.setAppElement('#root');

export const ServicesManage = () => {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const addService = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8800/services', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setServices([...services, response.data]);
      setTitle('');
      setImage(null);
      setImagePreview(null);
      setModalIsOpen(false);
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

  const editService = (service) => {
    setCurrentService(service);
    setTitle(service.title);
    setImagePreview(`http://localhost:8800${service.imageUrl}`);
    setEditModalIsOpen(true);
  };

  const updateService = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.put(`http://localhost:8800/services/${currentService._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setServices(services.map((service) => (service._id === currentService._id ? response.data : service)));
      setCurrentService(null);
      setTitle('');
      setImage(null);
      setImagePreview(null);
      setEditModalIsOpen(false);
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="services-manage-container">
        <h2>Manage Services</h2>
        <button onClick={() => setModalIsOpen(true)}>Add Service</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Add Service"
          className="Modal"
          overlayClassName="Overlay"
        >
          <h2>Add Service</h2>
          <form onSubmit={addService}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="file"
              onChange={handleImageChange}
              required
            />
            {imagePreview && <img src={imagePreview} alt="Image Preview" className="image-preview" />}
            <button type="submit">Add Service</button>
            <button type="button" onClick={() => setModalIsOpen(false)}>Cancel</button>
          </form>
        </Modal>
        <Modal
          isOpen={editModalIsOpen}
          onRequestClose={() => setEditModalIsOpen(false)}
          contentLabel="Edit Service"
          className="Modal"
          overlayClassName="Overlay"
        >
          <h2>Edit Service</h2>
          <form onSubmit={updateService}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
           <h3>Header Image</h3>
            <input
              type="file"
              onChange={handleImageChange}
            />
            {imagePreview && <img src={imagePreview} alt="Image Preview" className="image-preview" />}
            <button type="submit">Update Service</button>
            <button type="button" onClick={() => setEditModalIsOpen(false)}>Cancel</button>
          </form>
        </Modal>
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
                    <button className='edit' onClick={() => editService(service)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
