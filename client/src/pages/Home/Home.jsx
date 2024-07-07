import React, { useRef, useEffect, useState } from 'react';
import { Navbar } from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { Services } from '../../components/services/Services';
import { Gallery } from '../../components/gallery/Gallery';
import { Footer } from '../../components/footer/Footer';
import { AboutUs } from '../../components/aboutus/AboutUs';
import './home.scss';

export const Home = () => {
  const [isVisible, setIsVisible] = useState({
    header: false,
    services: false,
    gallery: false,
    aboutUs: false,
  });

  const servicesRef = useRef(null);
  const galleryRef = useRef(null);
  const aboutUsRef = useRef(null);
  const headerRef = useRef(null);

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.innerHeight / 2;
      const servicesTop = servicesRef.current.getBoundingClientRect().top;
      const galleryTop = galleryRef.current.getBoundingClientRect().top;
      const aboutUsTop = aboutUsRef.current.getBoundingClientRect().top;

      setIsVisible({
        header: headerRef.current.getBoundingClientRect().top < offset,
        services: servicesTop < offset,
        gallery: galleryTop < offset,
        aboutUs: aboutUsTop < offset,
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <Navbar scrollToSection={scrollToSection} headerRef={headerRef} servicesRef={servicesRef} galleryRef={galleryRef} aboutUsRef={aboutUsRef} />
      <div ref={headerRef} className={isVisible.header ? 'dropdown-enter-active' : 'dropdown-enter'}>
        <Header />
      </div>
    
      <div ref={servicesRef} className={isVisible.services ? 'dropdown-enter-active' : 'dropdown-enter'}>
        <Services />
      </div>
      <div ref={galleryRef} className={isVisible.gallery ? 'dropdown-enter-active' : 'dropdown-enter'}>
        <Gallery />
      </div>
      <div ref={aboutUsRef} className={isVisible.aboutUs ? 'dropdown-enter-active' : 'dropdown-enter'}>
        <AboutUs />
      </div>
      <Footer />
    </div>
  );
};
