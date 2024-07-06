import React from 'react';
import './dashboard.scss';
import { Link, Route, Routes } from 'react-router-dom';
import { GalleryManage } from '../gallerymanage/GalleryManage';
import { ServicesManage } from '../servicesmanage/ServicesManage';
import { HeaderManage } from '../headermanage/HeaderManage';
import { NavbarAdmin } from '../navbaradmin/NavbarAdmin';
import { GalleryM } from '../galleryM/GalleryM';

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <NavbarAdmin />
      <h1>Dashboard</h1>
      <div className="dashboard-nav">
      <div className="card">
          <Link to="/adminpanel/headermanage">
            <div className="card-content">
              <h2>Manage Headers</h2>
              <p>Manage all header images and captions.</p>
            </div>
          </Link>
        </div>
        <div className="card">
          <Link to="/adminpanel/servicesmanage">
            <div className="card-content">
              <h2>Manage Services</h2>
              <p>Manage all services offered by your website.</p>
            </div>
          </Link>
        </div>
        <div className="card">
          <Link to="/adminpanel/gallerymanage">
            <div className="card-content">
              <h2>Manage Gallery</h2>
              <p>Manage all galleries for your website.</p>
            </div>
          </Link>
        </div>
      
       
      </div>
      <div className="dashboard-content">
        <Routes>
          <Route path="/adminpanel/gallerymanage" element={<GalleryM />} />
          <Route path="/adminpanel/servicesmanage" element={<ServicesManage />} />
          <Route path="/adminpanel/headermanage" element={<HeaderManage />} />
        </Routes>
      </div>
    </div>
  );
};
