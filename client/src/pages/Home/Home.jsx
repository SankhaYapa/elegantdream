import React from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { Services } from '../../components/services/Services'
import { Gallery } from '../../components/gallery/Gallery'

export const Home = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Header></Header>
        <Services></Services>
        <Gallery></Gallery>
       
    </div>
  )
}
