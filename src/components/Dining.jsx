import React from 'react';
import { motion } from 'framer-motion';
import LuxuryDivider from './LuxuryDivider';
import diningImg from '../../images/imgi_10_619398631_18104782633815406_5512556646401281546_n.jpg';

const features = [
  'Lakeside Restaurant',
  'Afternoon Tea',
  'Private Dining & Celebrations',
];

export default function Dining() {
  return (
    <section id="dining" className="relative w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Half: Editorial Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-cream py-16 px-6 sm:py-24 sm:px-12 md:px-16 lg:px-24 flex flex-col justify-center items-start"
        >
          <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-gold uppercase mb-5">
            The Lakeside Restaurant
          </span>

          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-forest leading-tight mb-4">
            Dine with the Lake as Your View
          </h2>

          <LuxuryDivider centered={false} />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-base text-forest/80 leading-relaxed font-normal mb-8 max-w-lg"
          >
            Sharrow Bay&apos;s culinary heritage is legendary, serving AA Rosette-worthy cuisine 
            overlooking the dramatic waters of Ullswater. Here, fine dining is an experience that 
            unfolds slowly. Local ingredients are prepared with meticulous care, and each table 
            is framed by panoramic glass reflecting the seasons of Cumbria.
          </motion.p>

          {/* Feature lines with rules drawing in on scroll */}
          <div className="flex flex-col space-y-4 mb-10 w-full">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-3 py-1 border-b border-gold/5 max-w-sm">
                {/* 16px gold rule drawing in on scroll */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 16 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + 0.1 * idx, ease: 'easeOut' }}
                  className="h-[0.5px] bg-gold flex-shrink-0"
                />
                <span className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-forest/85">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <motion.a
            href="#booking"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[11px] font-sans font-bold tracking-[0.2em] bg-gold text-cream px-8 py-4 uppercase hover:bg-forest hover:text-cream border border-gold hover:border-forest transition-colors duration-300"
          >
            Reserve a Table
          </motion.a>
        </motion.div>

        {/* Right Half: Imagery with smaller dimensions to suit lower resolution */}
        <div className="relative flex items-center justify-center bg-[#FAF8F5] p-8 sm:p-16 lg:p-24 min-h-[400px] lg:min-h-0">
          
          {/* Image container with fixed proportions and limited size */}
          <div className="relative w-full max-w-[450px] aspect-[4/3] overflow-hidden border border-gold/15 z-10 select-none pointer-events-none bg-[#3F4E5A]">
            <div className="w-full h-full ken-burns">
              <img
                src={diningImg}
                alt="Dining room window overlooking lake and snowy mountains"
                className="w-full h-full object-cover object-center filter brightness-[0.8]"
              />
            </div>
            {/* Solid overlay tint */}
            <div className="absolute inset-0 bg-forest/15"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
