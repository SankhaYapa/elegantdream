import { useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { ServicesManage } from './pages/Admin/servicesmanage/ServicesManage'
import { GalleryManage } from './pages/Admin/gallerymanage/GalleryManage'
import { GalleryDetail } from './components/galleryDetails/GalleryDetail'
import { ServiceDetail } from './components/serviceDetails/ServiceDetail'
import { HeaderManage } from './pages/Admin/headermanage/HeaderManage'
import { Dashboard } from './pages/Admin/dashboard/Dashboard'

function App() {


  return (
    <BrowserRouter>
    <Routes>

      <Route
        path="/*"
        element={
          
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adminpanel" element={<Dashboard />} />
            <Route path="/adminpanel/gallerymanage" element={<GalleryManage />} />
            <Route path="/adminpanel/servicesmanage" element={<ServicesManage />} />
            <Route path="/adminpanel/headermanage" element={<HeaderManage />} />
            <Route path="/gallery/:id" element={<GalleryDetail />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            </Routes>
         
        }
      />
    </Routes>
  </BrowserRouter>
  )
}

export default App
