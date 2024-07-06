import React from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import { Footer } from '../../components/footer/Footer'
import { AboutUs } from '../../components/aboutus/AboutUs'

export const AboutUsPage = () => {
  return (
    <div>
        <Navbar></Navbar>
            <AboutUs></AboutUs>
        <Footer></Footer>
    </div>
  )
}
