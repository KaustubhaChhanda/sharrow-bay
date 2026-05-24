import React from 'react';
import { motion } from 'framer-motion';

export default function LuxuryDivider({ centered = true }) {
  return (
    <div className={`flex items-center my-6 w-full ${centered ? 'justify-center' : 'justify-start'}`}>
      {/* Left fine line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className={`h-[0.5px] bg-gold/50 w-16 md:w-28 ${centered ? 'origin-right' : 'origin-left'}`}
      />
      
      {/* Dynamic drawing SVG ornament */}
      <svg
        className="w-12 h-6 mx-3 text-gold/80"
        viewBox="0 0 48 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Symmetrical scroll wings */}
        <motion.path
          d="M 6 12 C 14 12, 18 6, 20 12 C 18 18, 14 12, 24 12"
          stroke="currentColor"
          strokeWidth="0.75"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
        />
        <motion.path
          d="M 42 12 C 34 12, 30 6, 28 12 C 30 18, 34 12, 24 12"
          stroke="currentColor"
          strokeWidth="0.75"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
        />
        {/* Central diamond */}
        <motion.path
          d="M 24 6 L 27 12 L 24 18 L 21 12 Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        />
        {/* Tiny dots */}
        <motion.circle
          cx="24"
          cy="12"
          r="1.2"
          fill="currentColor"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.9 }}
        />
      </svg>

      {/* Right fine line */}
      {centered && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-[0.5px] bg-gold/50 w-16 md:w-28 origin-left"
        />
      )}
    </div>
  );
}
