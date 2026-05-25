import React from 'react';
import { motion } from 'framer-motion';
import LuxuryDivider from './LuxuryDivider';
import eventsImg from '../../images/imgi_11_625102754_18332425525243826_2278774979383148005_n.jpg';

const occasions = [
  { label: 'Weddings', desc: 'Intimate lakeside ceremonies with bespoke menus' },
  { label: 'Milestone Dinners', desc: 'Private dining rooms exclusively yours for the evening' },
  { label: 'Corporate Retreats', desc: 'Refined away-days in the Cumbrian countryside' },
];

export default function Events() {
  return (
    <section id="events" className="bg-cream py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section header — centred editorial style */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-[10px] font-sans font-bold tracking-[0.35em] text-gold uppercase mb-3">
            Private Occasions
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-forest tracking-wide">
            Celebrate in the English Countryside
          </h2>
          <LuxuryDivider centered={true} />
        </div>

        {/* Two-column: image left, content right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">

          {/* Image */}
          <motion.div
            className="lg:col-span-7 relative select-none pointer-events-none"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative z-10 w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-0 overflow-hidden bg-[#5E4A35] border border-gold/15">
              <img
                src={eventsImg}
                alt="Formal private dining room table set for a 50th birthday celebration"
                className="w-full h-full object-cover object-center"
                style={{ minHeight: '100%' }}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-forest/20" />
            </div>
          </motion.div>

          {/* Info panel — floats over image on desktop */}
          <motion.div
            className="lg:col-span-5 bg-[#FAF8F5] border border-gold/15 p-8 sm:p-12 lg:-ml-10 lg:my-10 z-20 flex flex-col items-start relative self-center"
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          >
            <div className="z-10 flex flex-col items-start w-full">
              <p className="font-serif text-sm text-forest/75 leading-relaxed font-normal mb-8">
                From intimate weddings overlooking the lake fells to grand milestone dinners, 
                Sharrow Bay provides an unhurried, aristocratic backdrop for your most memorable days. 
                Our dining rooms are available for exclusive hire, offering custom tasting menus and 
                superb service tailored to your guests.
              </p>

              {/* Occasion list */}
              <div className="w-full mb-8 space-y-0">
                {occasions.map((o, idx) => (
                  <div key={idx} className="flex items-start gap-4 py-4 border-b border-gold/15 last:border-0">
                    <span className="w-1.5 h-1.5 bg-gold flex-shrink-0 mt-1.5" />
                    <div>
                      <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-gold uppercase block mb-0.5">
                        {o.label}
                      </span>
                      <span className="font-serif text-sm text-forest/70 font-normal">
                        {o.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#booking"
                className="text-[11px] font-sans font-bold tracking-[0.2em] bg-gold text-cream px-8 py-4 uppercase hover:bg-forest hover:text-cream border border-gold hover:border-forest transition-colors duration-300 w-full sm:w-auto text-center"
              >
                Enquire Now
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
