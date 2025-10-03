import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Genera partículas flotantes con tonos neutros y dorados
const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const regen = () => {
      const arr = [];
      for (let i = 0; i < 50; i++) {
        arr.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 5,
        });
      }
      setParticles(arr);
    };
    regen();
    window.addEventListener('resize', regen);
    return () => window.removeEventListener('resize', regen);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-20">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            // gradientes alternados: dorado, salvia o blanco
            background:
              p.id % 3 === 0
                ? 'radial-gradient(circle, rgba(191,169,119,0.45) 0%, rgba(191,169,119,0.15) 70%, transparent 100%)'
                : p.id % 2 === 0
                ? 'radial-gradient(circle, rgba(154,166,158,0.45) 0%, rgba(154,166,158,0.15) 70%, transparent 100%)'
                : 'radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 70%, transparent 100%)',
          }}
          animate={{ y: [0, -30, 0], x: [0, 15, -15, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;