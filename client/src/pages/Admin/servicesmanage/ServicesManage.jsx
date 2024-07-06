import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './servicesManage.scss';
import { NavbarAdmin } from '../navbaradmin/NavbarAdmin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

export const ServicesManage = () => {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [uploading, setUploading] = useState(false); // State for uploading indicator
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/services`);
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
    setLoading(true); // Show loading indicator

    const formData = new FormData();
    formData.append('title', title);
    formData.append('tag', tag);
    formData.append('image', image);

    try {
      setUploading(true); // Set uploading state

      const response = await axios.post(`${BASE_URL}/api/services`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setServices([...services, response.data]);
      setTitle('');
      setTag('');
      setImage(null);
      setImagePreview(null);
      toast.success('Service added successfully.'); // Notify success
      setLoading(false); // Hide loading indicator
      setUploading(false); // Hide uploading indicator
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error adding service:', error);
      toast.error('Failed to add service. Please try again.'); // Notify error
      setLoading(false); // Hide loading indicator on error
      setUploading(false); // Hide uploading indicator on error
    }
  };

  const deleteService = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/services/${id}`);
      setServices(services.filter((service) => service._id !== id));
      toast.success('Service deleted successfully.'); // Notify success
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service. Please try again.'); // Notify error
    }
  };

  const editService = (service) => {
    setCurrentService(service);
    setTitle(service.title);
    setTag(service.tag);
    setImagePreview(`${BASE_URL}${service.imageUrl}`);
    setEditModalIsOpen(true);
  };

  const updateService = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading indicator

    const formData = new FormData();
    formData.append('title', title);
    formData.append('tag', tag);
    if (image) {
      formData.append('image', image);
    }

    try {
      setUploading(true); // Set uploading state

      const response = await axios.put(`${BASE_URL}/api/services/${currentService._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setServices(services.map((service) => (service._id === currentService._id ? response.data : service)));
      setCurrentService(null);
      setTitle('');
      setTag('');
      setImage(null);
      setImagePreview(null);
      toast.success('Service updated successfully.'); // Notify success
      setLoading(false); // Hide loading indicator
      setUploading(false); // Hide uploading indicator
      setEditModalIsOpen(false);
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error('Failed to update service. Please try again.'); // Notify error
      setLoading(false); // Hide loading indicator on error
      setUploading(false); // Hide uploading indicator on error
    }
  };

  // Reset form fields
  const resetForm = () => {
    setTitle('');
    setTag('');
    setImage(null);
    setImagePreview(null);
  };

  // Handle modal close request
  const handleCloseModal = () => {
    resetForm(); // Reset form fields when closing modal
    setModalIsOpen(false);
    setEditModalIsOpen(false);
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="services-manage-container">
        <h2>Manage Services</h2>
        <button onClick={() => setModalIsOpen(true)}>Add Service</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
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
              type="text"
              placeholder="Tag Line"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              required
            />
            <input
              type="file"
              onChange={handleImageChange}
              required
            />
            {imagePreview && <img src={imagePreview} alt="Image Preview" className="image-preview" />}
            <button type="submit" disabled={loading || uploading}>
              {uploading ? 'Uploading...' : 'Add Service'}
            </button>
            <button type="button" onClick={handleCloseModal} disabled={loading || uploading}>
              Cancel
            </button>
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
            <input
              type="text"
              placeholder="Tag Line"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              required
            />
            <h3>Header Image</h3>
            <input
              type="file"
              onChange={handleImageChange}
            />
            {imagePreview && <img src={imagePreview} alt="Image Preview" className="image-preview" />}
            <button type="submit" disabled={loading || uploading}>
              {uploading ? 'Uploading...' : 'Update Service'}
            </button>
            <button type="button" onClick={handleCloseModal} disabled={loading || uploading}>
              Cancel
            </button>
          </form>
        </Modal>
        <div className="services-table">
          <table>
            <thead>
              <tr>
              <th>Title</th>
              <th>Tag Line</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id}>
                  <td>{service.title}</td>
                  <td>{service.tag}</td>
                  <td>
                    <img src={`${BASE_URL}${service.imageUrl}`} alt={service.title} width="50" />
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
      <ToastContainer /> {/* ToastContainer for react-toastify */}
    </div>
  );
};
