import React, { useRef } from 'react';
import { Navbar } from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { Services } from '../../components/services/Services';
import { Gallery } from '../../components/gallery/Gallery';
import { Footer } from '../../components/footer/Footer';
import { AboutUs } from '../../components/aboutus/AboutUs';

export const Home = () => {
  const servicesRef = useRef(null);
  const galleryRef = useRef(null);
  const aboutUsRef = useRef(null);
  const headerRef = useRef(null);

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Navbar scrollToSection={scrollToSection} headerRef={headerRef} servicesRef={servicesRef} galleryRef={galleryRef} aboutUsRef={aboutUsRef} />
      <div ref={headerRef}>
      <Header />
      </div>
    
      <div ref={servicesRef}>
        <Services />
      </div>
      <div ref={galleryRef}>
        <Gallery />
      </div>
      <div ref={aboutUsRef}>
      <AboutUs />
      </div>
      <Footer />
    </div>
  );
};
