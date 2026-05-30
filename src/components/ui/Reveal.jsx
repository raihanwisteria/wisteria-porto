import React from 'react';
import { motion } from 'framer-motion';

export default function Reveal({ children, width = '100%', delay = 0, className = '' }) {
  return (
    <div style={{ width }} className={`relative ${className}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
