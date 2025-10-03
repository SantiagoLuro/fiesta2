import React from 'react';
import { motion } from 'framer-motion';

// Código de vestimenta con paleta neutra y acento dorado
const DressCode = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-[#1f2937]/60 to-[#111827]/60 relative">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl playfair gradient-text mb-4">
            Dress Code
          </h2>
          <motion.div
            className="glass-effect rounded-2xl p-8 max-w-md mx-auto sparkle"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-3xl dancing-script gradient-text mb-4">
              Formal (Black Tie opcional)
            </h3>
            <p className="text-lg text-white/80">Paleta neutra y elegante</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="glass-effect rounded-2xl p-6"
            whileHover={{ scale: 1.02 }}
          >
            <h4 className="text-xl playfair gradient-text mb-2">Invitadas</h4>
            <p className="text-white/80">
              Vestidos largos o midi en tonos neutros (negro, gris, beige, verde salvia).
            </p>
            <p className="text-white/80">Evitar el blanco total.</p>
          </motion.div>

          <motion.div
            className="glass-effect rounded-2xl p-6"
            whileHover={{ scale: 1.02 }}
          >
            <h4 className="text-xl playfair gradient-text mb-2">Invitados</h4>
            <p className="text-white/80">
              Traje oscuro y camisa clara. Corbata o moño opcional.
            </p>
            <p className="text-white/80">Evitar el blanco total.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DressCode;