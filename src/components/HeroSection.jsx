import React from 'react';
import { motion } from 'framer-motion';

// Sección principal de portada con animaciones y nombres
const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="text-center z-10 px-4">
        {/* Nombres de la pareja */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-8"
        >
          <motion.h1
            className="text-6xl md:text-8xl playfair gradient-text mb-4"
            animate={{
              textShadow: [
                '0 0 16px rgba(191, 169, 119, 0.8)', // destello dorado suave
                '0 0 32px rgba(154, 166, 158, 0.8)', // destello verde salvia
                '0 0 16px rgba(191, 169, 119, 0.8)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Camila &amp; Tomás
          </motion.h1>
        </motion.div>

        {/* Mensaje de invitación */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="sparkle"
        >
          <p className="text-2xl md:text-3xl dancing-script text-white/90 mb-6">
            ¡Nos casamos! Te invitamos a celebrar con nosotros.
          </p>
        </motion.div>

        {/* Mensaje secundario sobre el gran día */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="glass-effect rounded-2xl p-6 max-w-md mx-auto"
        >
          <p className="text-lg playfair text-white/90">
            Acompañanos en esta ocasión tan especial y sé parte de nuestro comienzo.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;