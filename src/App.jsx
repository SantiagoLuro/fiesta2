import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import FloatingParticles from '@/components/FloatingParticles';
import AudioPlayer from '@/components/AudioPlayer';

import Home from '@/pages/Home';
import AlbumPage from '@/pages/AlbumPage';
import AlbumView from '@/pages/AlbumView';
import MusicPage from '@/pages/MusicPage';
import ConfirmPage from '@/pages/ConfirmPage';

// Principal layout para la invitación de boda
const App = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Actualiza variables CSS en función del desplazamiento para parallax
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const ratio = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const percent = ratio * 100;
      document.documentElement.style.setProperty('--scroll', String(ratio));
      document.documentElement.style.setProperty('--scroll-y', String(percent));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Imagen de fondo y parallax solo en Home */}
      {isHome && (
        <div className="fixed inset-0 -z-30 pointer-events-none" aria-hidden="true">
          <img
            src="/bg-bottom.jpg"
            alt=""
            className="w-full h-full object-cover"
            decoding="async"
            fetchpriority="high"
            style={{
              transform: 'translateY(calc(var(--scroll-y, 0) * -0.2%))',
              willChange: 'transform',
            }}
          />
        </div>
      )}

      {/* Partículas flotantes solo en Home */}
      {isHome && <FloatingParticles />}

      {/* Reproductor de audio con música de la fiesta */}
      <AudioPlayer src="/maxi-trusso.mp3" />

      {/* Rutas con animaciones de salida/entrada */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/album" element={<AlbumPage />} />
          <Route path="/album-view" element={<AlbumView />} />
          <Route path="/musica" element={<MusicPage />} />
          <Route path="/confirmar" element={<ConfirmPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;