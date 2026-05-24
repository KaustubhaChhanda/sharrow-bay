import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LuxuryDivider from './LuxuryDivider';
import storyImg from '../../images/imgi_23_669871054_18579165646049144_3381738805117895049_n.jpg';

const timelineSteps = [
  {
    year: '1948',
    title: 'Founded by Francis Coulson',
    desc: 'Francis Coulson purchased Sharrow Bay, pioneering the first "Country House Hotel" concept in Britain with warm, personalized service.',
  },
  {
    year: '1970s',
    title: 'Sticky Toffee Pudding Invented',
    desc: 'Francis Coulson created and perfected the secret recipe for Sticky Toffee Pudding right in the Sharrow Bay kitchens — now a British classic.',
  },
  {
    year: 'Today',
    title: 'AA Rosette Legend',
    desc: 'A living legend of British hospitality, welcoming travellers to the shores of Ullswater with refined dining and aristocratic charm.',
  },
];

export default function OurStory() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="story"
      ref={sectionRef}
      className="bg-cream py-20 lg:py-32 overflow-hidden border-t-0.5 border-b-0.5 border-gold"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Centred editorial header */}
        <div className="text-center mb-16 lg:mb-20 flex flex-col items-center">
          <span className="text-[10px] font-sans font-bold tracking-[0.35em] text-gold uppercase mb-3">
            Est. 1948 · Ullswater
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-forest tracking-wide">
            Our Story
          </h2>
          <LuxuryDivider centered={true} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left: Parallax Image with offset gold frame */}
          <div className="lg:col-span-5 relative h-[450px] sm:h-[580px] lg:h-[680px] w-full select-none pointer-events-none">
            {/* Offset Gold frame behind the image */}
            <div className="absolute inset-0 border border-gold/30 translate-x-4 translate-y-4 pointer-events-none z-0" />
            <div className="w-full h-full overflow-hidden bg-[#2D3A2E] border border-gold/40 relative z-10">
              <motion.div
                style={{ y: imageY }}
                className="absolute -top-[10%] left-0 w-full h-[120%]"
              >
                <img
                  src={storyImg}
                  alt="Stone entrance door of Sharrow Bay with Christmas decorations"
                  className="w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.05]"
                />
              </motion.div>
            </div>

            {/* Floating year badge */}
            <div className="absolute -bottom-5 -right-5 bg-forest border border-gold/50 px-6 py-4 z-20">
              <span className="font-serif text-3xl font-bold text-gold block leading-none">75+</span>
              <span className="text-[9px] font-sans font-bold tracking-[0.2em] text-cream/70 uppercase mt-1 block">Years of Excellence</span>
            </div>
          </div>

          {/* Right: Editorial text and timeline */}
          <div className="lg:col-span-7 flex flex-col items-start lg:pt-4">

            {/* Pull-quote */}
            <blockquote className="font-serif text-2xl sm:text-3xl italic text-forest/90 leading-relaxed font-semibold mb-10 select-none border-l-4 border-gold pl-6">
              &ldquo;The hotel that gave England the country house stay — and the sticky toffee pudding.&rdquo;
            </blockquote>

            <p className="font-serif text-base text-forest/70 leading-relaxed font-normal mb-10 max-w-lg">
              More than seven decades of stories reside within Sharrow Bay. From the first guests 
              who arrived by steamboat across Ullswater to today's discerning travellers, the spirit 
              of Francis Coulson's original vision has never wavered.
            </p>

            {/* Vertical timeline */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="relative pl-6 sm:pl-8 border-l border-gold/25 flex flex-col space-y-10 w-full"
            >
              {/* Animated gold bar drawing in */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
                className="absolute left-0 top-0 w-[1px] bg-gold origin-top"
              />

              {timelineSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="relative group"
                >
                  {/* Timeline solid dot */}
                  <motion.div
                    className="absolute -left-[27px] sm:-left-[35px] top-[14px] -translate-y-1/2 w-2 h-2 bg-gold z-10"
                    whileHover={{ scale: 1.6 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Breathing outer ring */}
                  <motion.div
                    className="absolute -left-[33px] sm:-left-[41px] top-[14px] -translate-y-1/2 w-[14px] h-[14px] border border-gold/40 pointer-events-none z-0"
                    animate={{ opacity: [0.1, 0.7, 0.1], scale: [0.8, 1.4, 0.8] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.5 }}
                  />

                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-gold font-serif text-xl italic font-bold select-none">
                      {step.year}
                    </span>
                    <div className="h-[1px] flex-1 bg-gold/15" />
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-forest tracking-wide mb-2">
                    {step.title}
                  </h3>

                  <p className="font-sans text-[13px] leading-relaxed text-forest/75 tracking-wide max-w-lg font-normal">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
