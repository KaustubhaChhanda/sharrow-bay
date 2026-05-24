import React from 'react';
import { motion } from 'framer-motion';
import { Waves, Coffee, Cookie } from 'lucide-react';
import LuxuryDivider from './LuxuryDivider';
import afternoonTeaImg from '../../images/imgi_40_627955224_18351339748226796_609914740476861493_n.jpg';

const features = [
  {
    icon: Waves,
    title: 'Lakeside Views',
    desc: 'Sip loose-leaf tea by the bay window with uninterrupted vistas of Ullswater fells.',
  },
  {
    icon: Coffee,
    title: 'Fine Bone China',
    desc: 'Served in the grandest country house style on vintage porcelain and silver service.',
  },
  {
    icon: Cookie,
    title: 'Homemade Pastries',
    desc: 'Warm buttery scones, clotted cream, preserves, and seasonal delicate pastries.',
  },
];

export default function AfternoonTea() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="bg-forest py-20 lg:py-28 text-cream overflow-hidden mt-12 lg:mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left panel: Image with dark overlay and offset gold frame */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[500px] order-2 lg:order-1 select-none pointer-events-none"
          >
            {/* Offset Gold frame behind the image */}
            <div className="absolute inset-0 border border-gold/30 translate-x-3 translate-y-3 pointer-events-none z-0"></div>
            <div className="w-full h-full overflow-hidden bg-[#5E4A35] border border-gold/40 relative z-10">
              <img
                src={afternoonTeaImg}
                alt="Afternoon tea tray set by a bay window overlooking Ullswater"
                className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.05]"
              />
              {/* Soft dark solid tint */}
              <div className="absolute inset-0 bg-forest/40 mix-blend-multiply"></div>
            </div>
          </motion.div>

          {/* Right panel: Content and columns */}
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 order-1 lg:order-2"
          >
            <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-gold uppercase mb-5 block">
              Classic Country House Tea
            </span>

            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-cream leading-tight mb-4">
              An Afternoon Ritual, Perfected
            </h2>

            <LuxuryDivider centered={false} />

            <p className="font-serif text-base text-cream/80 leading-relaxed font-normal mb-12 max-w-xl">
              At Sharrow Bay, afternoon tea is not merely a meal; it is a sacred English ritual. 
              Relax in deep velvet cushions while taking in sweeping lake-and-mountain views, 
              accompanied by the gentle clink of fine bone china and warm, golden amber lamplight.
            </p>

            {/* Feature columns with stagger */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8"
            >
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div key={idx} variants={itemVariants} className="flex flex-col items-start">
                    <div className="w-10 h-10 border border-gold/40 flex items-center justify-center mb-4">
                      <Icon size={18} strokeWidth={1.5} className="text-gold" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-cream mb-2 tracking-wide">
                      {feature.title}
                    </h3>
                    <p className="font-sans text-[11px] leading-relaxed text-cream/70 tracking-wider font-medium">
                      {feature.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
