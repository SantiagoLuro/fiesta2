import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * Página de detalle de foto individual.
 * Se ha simplificado para mostrar un mensaje informando que la vista
 * detallada estará disponible durante la fiesta.  
 */
const AlbumView = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 text-center">
      <div>
        <motion.h1
          className="text-4xl md:text-5xl playfair gradient-text mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Vista de Foto
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          La vista individual de cada foto estará habilitada el día de la boda.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            to="/album"
            className="inline-block bg-gradient-to-r from-[#2c3e50] to-[#bfa977] text-white px-8 py-4 rounded-full text-lg font-semibold btn-glow"
          >
            Volver al Álbum
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default AlbumView;