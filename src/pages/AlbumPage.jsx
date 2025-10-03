import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * Página de álbum de fotos.
 * En esta versión premium simplificada no se implementa la carga de
 * fotografías; en su lugar se ofrece un mensaje informando que la
 * funcionalidad estará disponible durante la fiesta.  
 * El diseño mantiene la estética neutra y utiliza animaciones suaves.
 */
const AlbumPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 text-center">
      <div>
        <motion.h1
          className="text-4xl md:text-5xl playfair gradient-text mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Álbum de Fotos
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Pronto podrás subir y ver todas las fotos de nuestra boda aquí. ¡Estate atento el día del evento!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
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

export default AlbumPage;