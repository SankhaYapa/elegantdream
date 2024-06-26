import { useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { ServicesManage } from './pages/Admin/servicesmanage/ServicesManage'
import { GalleryManage } from './pages/Admin/gallerymanage/GalleryManage'
import { GalleryDetail } from './components/galleryDetails/GalleryDetail'

function App() {


  return (
    <BrowserRouter>
    <Routes>

      <Route
        path="/*"
        element={
          
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adminpanel" element={<ServicesManage />} />
            <Route path="/adminpanel/gallerymanage" element={<GalleryManage />} />
            <Route path="/gallery/:id" element={<GalleryDetail />} />
            </Routes>
         
        }
      />
    </Routes>
  </BrowserRouter>
  )
}

export default App
