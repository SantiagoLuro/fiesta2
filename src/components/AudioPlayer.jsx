import React, { useEffect, useRef } from 'react';

// Componente que reproduce automáticamente una pista de audio al cargar.
export default function AudioPlayer({ src = '/music.mp3' }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.6;
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        const onFirstClick = () => {
          audio.play().catch(() => {});
          window.removeEventListener('click', onFirstClick);
        };
        window.addEventListener('click', onFirstClick, { once: true });
      });
    }
  }, [src]);

  return <audio ref={audioRef} src={src} loop preload="none" className="hidden" />;
}