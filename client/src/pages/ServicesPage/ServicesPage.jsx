import React from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import { Footer } from '../../components/footer/Footer'
import { Services } from '../../components/services/Services'
import './servicesPage.scss'
export const ServicesPage = () => {
  return (
    <div>
        <Navbar>
        </Navbar>
        <Services classname='dropdown-enter'></Services>
        <Footer></Footer>
    </div>
  )
}
