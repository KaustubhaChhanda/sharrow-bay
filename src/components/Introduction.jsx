import React from 'react';
import { motion } from 'framer-motion';
import LuxuryDivider from './LuxuryDivider';

export default function Introduction() {
  return (
    <section className="bg-cream py-24 lg:py-36 px-6 relative overflow-hidden">
      {/* Large decorative watermark letter */}
      <span className="absolute left-0 top-1/2 -translate-y-1/2 font-serif text-[200px] lg:text-[280px] text-forest/[0.03] select-none pointer-events-none leading-none font-bold -ml-8 lg:-ml-12">
        S
      </span>
      <span className="absolute right-0 top-1/2 -translate-y-1/2 font-serif text-[200px] lg:text-[280px] text-forest/[0.03] select-none pointer-events-none leading-none font-bold -mr-8 lg:-mr-12">
        B
      </span>

      <div className="max-w-3xl mx-auto text-center flex flex-col items-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-[10px] font-sans font-bold tracking-[0.35em] text-gold uppercase mb-6"
        >
          A Living Piece of English History
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="font-serif text-4xl md:text-5xl font-semibold text-forest leading-tight mb-3"
        >
          More than a hotel.
          <br />
          <span className="italic font-normal text-forest/70">An institution.</span>
        </motion.h2>

        <LuxuryDivider centered={true} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="font-serif text-base md:text-lg text-forest/75 leading-relaxed font-normal mb-10 max-w-2xl"
        >
          Established in 1948 on the wild, tranquil shores of Lake Ullswater, Sharrow Bay 
          stands as England&apos;s very first country house hotel. Pioneered by the legendary 
          Francis Coulson, it redefined British hospitality, cultivating an atmosphere of 
          unhurried luxury, gilded warmth, and culinary genius. Nestled against the rugged 
          Lakeland fells, it remains a sanctuary where the lake meets timeless grace.
        </motion.p>

        {/* Pull quote accent */}
        <motion.blockquote
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
          className="border-l-2 border-gold pl-6 text-left max-w-lg"
        >
          <p className="font-serif text-base italic text-forest/60 leading-relaxed font-normal">
            &ldquo;The pinnacle of the English country house tradition — a place of extraordinary 
            beauty, warmth, and impeccable taste.&rdquo;
          </p>
          <cite className="text-[9px] font-sans font-bold tracking-[0.2em] text-gold uppercase mt-3 block not-italic">
            — Harpers &amp; Queen Magazine
          </cite>
        </motion.blockquote>
      </div>
    </section>
  );
}
