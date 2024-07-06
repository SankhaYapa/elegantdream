import { useState } from 'react';
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { ServicesManage } from './pages/Admin/servicesmanage/ServicesManage'
import { GalleryManage } from './pages/Admin/gallerymanage/GalleryManage'
import { GalleryDetail } from './components/galleryDetails/GalleryDetail'
import { ServiceDetail } from './components/serviceDetails/ServiceDetail'
import { HeaderManage } from './pages/Admin/headermanage/HeaderManage'
import { Dashboard } from './pages/Admin/dashboard/Dashboard'
import { GalleryM } from './pages/Admin/galleryM/GalleryM';
import { AboutUsPage } from './pages/AboutUsPage/AboutUsPage';
import { ServicesPage } from './pages/ServicesPage/ServicesPage';
import { Gallery } from './components/gallery/Gallery';
import { GalleriesPage } from './pages/GalleriesPage/GalleriesPage';

function App() {


  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/aboutus" element={<AboutUsPage />} />
    <Route path="/services" element={<ServicesPage />} />
    <Route path="/gallery" element={<GalleriesPage />} />
      <Route path="/adminpanel" element={<Dashboard />} />
      <Route path="/adminpanel/gallerymanage" element={<GalleryM />} />
      <Route path="/adminpanel/servicesmanage" element={<ServicesManage />} />
      <Route path="/adminpanel/headermanage" element={<HeaderManage />} />
      <Route path="/gallery/:id" element={<GalleryDetail />} />
      <Route path="/service/:id" element={<ServiceDetail />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
