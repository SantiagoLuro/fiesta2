import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * Página para sugerir canciones.
 * La funcionalidad real de enviar sugerencias podría integrarse con
 * un servicio externo (por ejemplo, EmailJS) en el futuro. De momento
 * se ofrece un formulario simple que imprime por consola y un botón para volver.
 */
const MusicPage = () => {
  const [song, setSong] = useState('');
  const [artist, setArtist] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Canción sugerida:', song, 'de', artist);
    setSong('');
    setArtist('');
    alert('¡Gracias por tu sugerencia!');
  };
  return (
    <main className="min-h-screen flex items-center justify-center px-4 text-center">
      <div className="w-full max-w-lg">
        <motion.h1
          className="text-4xl md:text-5xl playfair gradient-text mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Sugerir Canción
        </motion.h1>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-effect rounded-2xl p-8 space-y-6 text-left"
        >
          <div>
            <label className="block mb-2 font-semibold">Título de la canción</label>
            <input
              type="text"
              value={song}
              onChange={(e) => setSong(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bfa977]/50 transition text-gray-900 bg-white"
              placeholder="Ej: Perfect"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Artista</label>
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bfa977]/50 transition text-gray-900 bg-white"
              placeholder="Ej: Ed Sheeran"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#2c3e50] to-[#bfa977] text-white px-8 py-4 rounded-full text-lg font-semibold btn-glow"
          >
            Enviar sugerencia
          </button>
        </motion.form>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6"
        >
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-[#2c3e50] to-[#bfa977] text-white px-8 py-4 rounded-full text-lg font-semibold btn-glow"
          >
            Volver al Inicio
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default MusicPage;