import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroBg from '../../images/1_SBH_Site-Photo-View-of-Sharrow-Bay-1536x1024.jpg';

export default function Hero() {
  const containerRef = useRef(null);

  // Parallax scroll effect using framer-motion useScroll and useTransform
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  
  // Slowly translate the background image downwards as user scrolls
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1], // premium custom cubic-bezier
      },
    },
  };

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[calc(100vh-82px)] lg:h-[calc(100vh-92px)] min-h-[600px] overflow-hidden"
    >
      {/* Background Image Container */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-[#3F4E5A] bg-cover bg-center select-none pointer-events-none"
      >
        {/* Actual Image Tag with Ken Burns zoom effect */}
        <img
          src={heroBg}
          alt="Sharrow Bay lakeside view"
          className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.05] ken-burns"
        />
      </motion.div>

      {/* Solid overlay for text readability (no gradients as per constraint) */}
      <div className="absolute inset-0 bg-forest/50"></div>

      {/* Centred Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center px-6 lg:px-12 text-center text-cream">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl flex flex-col items-center"
        >
          {/* Eyebrow Label */}
          <motion.span
            variants={itemVariants}
            className="text-[10px] md:text-xs font-sans font-bold tracking-[0.3em] text-gold uppercase mb-4 md:mb-6"
          >
            England&apos;s First Country House Hotel &middot; Since 1948
          </motion.span>

          {/* Heading with curtain-mask reveal */}
          <div className="overflow-hidden py-1">
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold italic leading-tight text-cream mb-2 md:mb-4 select-none"
            >
              Where the Lake Meets Timeless Grace
            </motion.h1>
          </div>

          {/* Subline */}
          <motion.p
            variants={itemVariants}
            className="text-xs md:text-sm font-sans font-bold tracking-[0.25em] text-cream/90 uppercase mb-10 select-none"
          >
            Ullswater, Lake District &middot; Cumbria
          </motion.p>

          {/* Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto"
          >
            <motion.a
              href="#booking"
              onClick={(e) => handleScrollTo(e, '#booking')}
              whileHover={{ scale: 1.04, boxShadow: '0 4px 20px rgba(168, 129, 58, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto text-[11px] font-sans font-bold tracking-[0.2em] bg-gold text-cream px-8 py-4 uppercase border border-gold hover:bg-cream hover:text-forest transition-colors duration-300"
            >
              Reserve a Room
            </motion.a>
            <motion.a
              href="#dining"
              onClick={(e) => handleScrollTo(e, '#dining')}
              whileHover={{ scale: 1.04, boxShadow: '0 4px 20px rgba(247, 243, 236, 0.15)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto text-[11px] font-sans font-bold tracking-[0.2em] text-cream border border-cream/70 px-8 py-4 uppercase hover:bg-gold hover:text-cream hover:border-gold transition-colors duration-300"
            >
              Explore Dining
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
