import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './galleryManage.scss';
import { NavbarAdmin } from '../navbaradmin/NavbarAdmin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

export const GalleryM = () => {
  const [name, setName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [images, setImages] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [coverImgPreview, setCoverImgPreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [galleries, setGalleries] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Error fetching services. Please try again.');
    }
  };

  const fetchGalleries = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/gallery`);
      setGalleries(response.data);
    } catch (error) {
      console.error('Error fetching galleries:', error);
      toast.error('Error fetching galleries. Please try again.');
    }
  };

  useEffect(() => {
    fetchServices();
    fetchGalleries();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleCoverImgChange = (e) => {
    const file = e.target.files[0];
    setCoverImg(file);
    setCoverImgPreview(URL.createObjectURL(file));
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when form is submitted

    const formData = new FormData();
    formData.append('name', name);
    formData.append('thumbnail', thumbnail);
    formData.append('coverImg', coverImg);
    images.forEach((image) => formData.append('images', image));
    const selectedServiceObj = services.find((service) => service._id === selectedService);
    formData.append('service', selectedServiceObj ? selectedServiceObj.title : '');


    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      };

      if (editMode) {
        await axios.put(`${BASE_URL}/api/gallery/${editId}`, formData, config);
        toast.success('Gallery item updated successfully');
      } else {
        await axios.post(`${BASE_URL}/api/gallery`, formData, config);
        toast.success('Gallery item added successfully');
      }

      // Reset form state
      resetForm();
      setModalIsOpen(false);
      fetchGalleries();
    } catch (error) {
      console.error('Error uploading gallery item:', error);
      toast.error('Failed to upload gallery item. Please try again.');
    } finally {
      setIsLoading(false); // Set loading back to false after request completes
    }
  };

  const handleEdit = (gallery) => {
    setName(gallery.name);
    setSelectedService(gallery.service);
    setThumbnailPreview(`${BASE_URL}${gallery.thumbnail}`);
    setCoverImgPreview(`${BASE_URL}${gallery.coverImg}`);
    setImagePreviews(gallery.images.map((image) => `${BASE_URL}${image}`));
    setEditMode(true);
    setEditId(gallery._id);
    setModalIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/gallery/${id}`);
      fetchGalleries();
      toast.success('Gallery item deleted successfully');
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      toast.error('Failed to delete gallery item. Please try again.');
    }
  };

  // Reset form fields
  const resetForm = () => {
    setName('');
    setThumbnail(null);
    setCoverImg(null);
    setImages([]);
    setThumbnailPreview(null);
    setCoverImgPreview(null);
    setImagePreviews([]);
    setSelectedService('');
    setEditMode(false);
    setEditId(null);
  };

  // Handle modal close request
  const handleCloseModal = () => {
    resetForm(); // Reset form fields when closing modal
    setModalIsOpen(false);
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="gallery-manage-container">
        <h2>Manage Gallery</h2>
        <button onClick={() => setModalIsOpen(true)}>Add Gallery Item</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Add Gallery Item"
          className="Modal"
          overlayClassName="Overlay"
        >
          <h2>{editMode ? 'Edit Gallery Item' : 'Add Gallery Item'}</h2>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Service Type:</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              required
            >
              <option value="" disabled>Select Service Type</option>
              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.title}
                </option>
              ))}
            </select>
            <label>Thumbnail:</label>
            <input
              type="file"
              onChange={handleThumbnailChange}
              required
            />
            {thumbnailPreview && (
              <div className="image-preview-container">
                <img src={thumbnailPreview} alt="Thumbnail Preview" />
              </div>
            )}
            <label>Cover Image:</label>
            <input
              type="file"
              onChange={handleCoverImgChange}
              required
            />
            {coverImgPreview && (
              <div className="image-preview-container">
                <img className='image-preview-cover-img' src={coverImgPreview} alt="Cover Image Preview" />
              </div>
            )}
            <label>Gallery Images:</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              required
            />
            {imagePreviews.length > 0 && (
              <div className="image-preview-grid">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="image-preview-container">
                    <img src={preview} alt={`Image Preview ${index}`} />
                    <span className='button-remove' type="button" onClick={() => removeImage(index)}>X</span>
                  </div>
                ))}
              </div>
            )}
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : (editMode ? 'Update Gallery Item' : 'Add Gallery Item')}
            </button>
            <button type="button" onClick={handleCloseModal}>Cancel</button>
          </form>
        </Modal>
        <div className="galleries-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Service</th>
                <th>Thumbnail</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {galleries.map((gallery) => (
                <tr key={gallery._id}>
                  <td>{gallery.name}</td>
                  <td>{gallery.service}</td>
                  <td>
                    <img src={`${BASE_URL}${gallery.thumbnail}`} alt={gallery.name} width="50" />
                  </td>
                  <td>
                    <button onClick={() => handleEdit(gallery)} className='edit'>Edit</button>
                    <button onClick={() => handleDelete(gallery._id)} className='delete'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
