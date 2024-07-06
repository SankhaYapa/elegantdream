import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './headermanage.scss';
import { NavbarAdmin } from '../navbaradmin/NavbarAdmin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

export const HeaderManage = () => {
  const [headers, setHeaders] = useState([]);
  const [caption, setCaption] = useState('');
  const [files, setFiles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [previewImages, setPreviewImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchHeaders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/headers`);
        setHeaders(response.data);
      } catch (error) {
        console.error('Error fetching headers:', error);
        toast.error('Error fetching headers. Please try again.');
      }
    };

    fetchHeaders();
  }, []);

  const handleAddHeader = async (e) => {
    e.preventDefault();

    if (caption.length > 100) {
      setErrorMessage('Caption must be 100 characters or less');
      return;
    }

    setIsLoading(true); // Start loading

    const formData = new FormData();
    formData.append('caption', caption);
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/headers`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setHeaders([...headers, response.data]);
      setCaption('');
      setFiles([]);
      setPreviewImages([]);
      setErrorMessage('');
      toast.success('Header added successfully.');
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error adding header:', error);
      toast.error('Failed to add header. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleDeleteHeader = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/headers/${id}`);
      setHeaders(headers.filter(header => header._id !== id));
      toast.success('Header deleted successfully.');
    } catch (error) {
      console.error('Error deleting header:', error);
      toast.error('Failed to delete header. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);
    const filePreviews = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      filePreviews.push(URL.createObjectURL(file));
    }
    setPreviewImages(filePreviews);
  };

  const resetForm = () => {
    setCaption('');
    setFiles([]);
    setPreviewImages([]);
    setErrorMessage('');
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="header-manage-container">
        <h2>Manage Headers Image Slider</h2>
        <button onClick={() => setModalIsOpen(true)} disabled={headers.length >= 4}>
          {headers.length >= 4 ? 'Maximum Headers Reached (4 Slides)' : 'Add New Image Slider +'}
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => {
            resetForm();
            setModalIsOpen(false);
          }}
          contentLabel="Add Header"
          className="Modal"
          overlayClassName="Overlay"
        >
          <h2>Add Header</h2>
          <form onSubmit={handleAddHeader}>
            <textarea
              type="text"
              placeholder="Caption (max 100 characters)"
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
                if (e.target.value.length <= 100) {
                  setErrorMessage('');
                }
              }}
              maxLength="100"
              required
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              required
            />
            <div className="preview-images">
              {previewImages.map((image, index) => (
                <img key={index} src={image} alt="Preview" />
              ))}
            </div>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <button type="submit">Add Header</button>
                <button type="button" onClick={() => {
                  resetForm();
                  setModalIsOpen(false);
                }}>Cancel</button>
              </>
            )}
          </form>
        </Modal>
        <div className="header-list">
          {headers.map(header => (
            <div key={header._id} className="header-item">
              {header.images.map((image, index) => (
                <img key={index} src={`${BASE_URL}${image}`} alt={header.caption} />
              ))}
              <div className="header-info">
                <p>{header.caption}</p>
                <button onClick={() => handleDeleteHeader(header._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer /> {/* ToastContainer for react-toastify */}
    </div>
  );
};

export default HeaderManage;
