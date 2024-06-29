import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './galleryManage.scss';
import { NavbarAdmin } from '../navbaradmin/NavbarAdmin';

export const GalleryManage = () => {
  const [name, setName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [images, setImages] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8800/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleCoverImgChange = (e) => {
    setCoverImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('thumbnail', thumbnail);
    formData.append('coverImg', coverImg);
    images.forEach((image) => {
      formData.append('images', image);
    });
  // Find the selected service object to get its title
  const selectedServiceObj = services.find(service => service._id === selectedService);
  formData.append('service', selectedServiceObj.title );
    try {
        console.log(selectedService)
      await axios.post('http://localhost:8800/gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Gallery item added successfully');
    } catch (error) {
      console.error('Error uploading gallery item:', error);
    }
  };

  return (
    <div> <NavbarAdmin></NavbarAdmin>
     <div className="gallery-manage-container">
     
     <h2>Manage Gallery</h2>
     <form onSubmit={handleSubmit}>
       <input
         type="text"
         placeholder="Name"
         value={name}
         onChange={(e) => setName(e.target.value)}
         required
       />
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
       <input
         type="file"
         onChange={handleThumbnailChange}
         required
       />
       <input
         type="file"
         onChange={handleCoverImgChange}
         required
       />
       <input
         type="file"
         multiple
         onChange={handleImageChange}
         required
       />
       <button type="submit">Add Gallery Item</button>
     </form>
   </div></div>
   
  );
};
