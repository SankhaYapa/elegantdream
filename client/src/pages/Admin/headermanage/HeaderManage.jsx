import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './headermanage.scss';
import { NavbarAdmin } from '../navbaradmin/NavbarAdmin';

Modal.setAppElement('#root');

export const HeaderManage = () => {
  const [headers, setHeaders] = useState([]);
  const [caption, setCaption] = useState('');
  const [files, setFiles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    const fetchHeaders = async () => {
      try {
        const response = await axios.get('http://localhost:8800/headers');
        setHeaders(response.data);
      } catch (error) {
        console.error('Error fetching headers:', error);
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

    const formData = new FormData();
    formData.append('caption', caption);
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      const response = await axios.post('http://localhost:8800/headers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setHeaders([...headers, response.data]);
      setCaption('');
      setFiles([]);
      setPreviewImages([]);
      setErrorMessage('');
      alert('Header added successfully');
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error adding header:', error);
    }
  };

  const handleDeleteHeader = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/headers/${id}`);
      setHeaders(headers.filter(header => header._id !== id));
      alert('Header deleted successfully');
    } catch (error) {
      console.error('Error deleting header:', error);
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

  return (
    <div>
      <NavbarAdmin />
      <div className="header-manage-container">
        <h2>Manage Headers Image Slider</h2>
        {headers.length < 4 && (
          <button onClick={() => setModalIsOpen(true)}>Add New Image Slider +</button>
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
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
            <button type="submit">Add Header</button>
            <button type="button" onClick={() => setModalIsOpen(false)}>Cancel</button>
          </form>
        </Modal>
        <div className="header-list">
          {headers.map(header => (
            <div key={header._id} className="header-item">
              {header.images.map((image, index) => (
                <img key={index} src={`http://localhost:8800${image}`} alt={header.caption} />
              ))}
              <div className="header-info">
                <p>{header.caption}</p>
                <button onClick={() => handleDeleteHeader(header._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
