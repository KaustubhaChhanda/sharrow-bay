import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, ChefHat, Compass } from 'lucide-react';

const items = [
  {
    icon: Calendar,
    label: 'Est. 1948',
    value: "England's First Country House",
  },
  {
    icon: Award,
    label: 'AA Rosette Dining',
    value: 'Fine Lakeside Gastronomy',
  },
  {
    icon: ChefHat,
    label: 'Birthplace Of',
    value: 'Sticky Toffee Pudding',
  },
  {
    icon: Compass,
    label: 'Ullswater Lakeside',
    value: 'Lake District, Cumbria',
  },
];

export default function HeritageStrip() {
  return (
    <section className="bg-forest border-t border-gold/30 border-b border-b-gold/30">
      {/* Gold accent shimmer line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="h-[1px] bg-gold w-full origin-left"
      />

      <div className="max-w-7xl mx-auto px-6 py-10 lg:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: index * 0.12, ease: 'easeOut' }}
                className={`flex flex-col items-center text-center px-6 py-6 lg:py-4 ${
                  index !== items.length - 1 ? 'border-r border-gold/20' : ''
                } ${index >= 2 ? 'border-t border-t-gold/20 lg:border-t-0' : ''}`}
              >
                <div className="w-10 h-10 border border-gold/40 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-gold" strokeWidth={1.5} />
                </div>
                <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-gold/80 uppercase mb-1.5">
                  {item.label}
                </span>
                <span className="text-[13px] font-serif font-semibold text-cream tracking-wide leading-snug">
                  {item.value}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom gold accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="h-[1px] bg-gold/40 w-full origin-right"
      />
    </section>
  );
}
