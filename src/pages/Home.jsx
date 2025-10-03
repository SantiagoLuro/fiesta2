import React from 'react';

// Importa todas las secciones premium para construir la página principal de la boda
import HeroSection from '@/components/HeroSection';
import EventDetails from '@/components/EventDetails';
import DressCode from '@/components/DressCode';
import PhotoGallery from '@/components/PhotoGallery';
import MusicSection from '@/components/MusicSection';
import RSVP from '@/components/RSVP';
import Footer from '@/components/Footer';

/**
 * Página de inicio de la invitación.  
 * Este componente compone las distintas secciones decorativas para que se
 * muestren en orden. Todas las secciones utilizan la paleta neutra y dorada
 * definida en src/index.css y cuentan con animaciones sutiles gracias a
 * framer‑motion.
 */
const Home = () => {
  return (
    <>
      <HeroSection />
      <EventDetails />
      <DressCode />
      <PhotoGallery />
      <MusicSection />
      <RSVP />
      <Footer />
    </>
  );
};

export default Home;