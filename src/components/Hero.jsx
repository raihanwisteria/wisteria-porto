import React from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  }
};

export default function Hero() {
  return (
    <section id="home" className="min-h-[100svh] flex flex-col justify-center">
      <motion.div 
        className="mx-auto w-full max-w-3xl px-6 md:px-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="mb-10">
          <motion.span variants={item} className="mb-4 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
            00 / Intro
          </motion.span>
          
          <motion.h1 variants={item} className="font-sans text-[clamp(3rem,9vw,5rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-text-primary group">
            Raihan
            <br />
            <span className="font-serif italic font-normal text-accent relative inline-block transition-transform duration-500 md:hover:scale-105">
              Wisteria
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-500 md:group-hover:w-full" />
              <span className="absolute inset-0 bg-accent/20 blur-xl opacity-0 transition-opacity duration-500 md:group-hover:opacity-100 mix-blend-screen" />
            </span>
          </motion.h1>
        </div>

        {/* Description */}
        <motion.p variants={item} className="max-w-lg font-sans text-base leading-relaxed text-text-secondary md:text-lg">
          A software developer bridging the gap between meticulous engineering and breathtaking aesthetics. I transform complex problems into intuitive digital experiences.
        </motion.p>
      </motion.div>
    </section>
  );
}
