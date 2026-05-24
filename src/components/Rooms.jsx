import React from 'react';
import { motion } from 'framer-motion';
import { Waves, BedDouble, Flame } from 'lucide-react';
import LuxuryDivider from './LuxuryDivider';

// Relative imports for images
import tartanCanopyImg from '../../images/imgi_38_618950643_18142806421462446_1969784698008249469_n.jpg';
import damaskCanopyImg from '../../images/imgi_40_620477102_18141771580481126_5586506220430535281_n.jpg';
import heritageDamaskImg from '../../images/imgi_51_530613712_1726505477994009_2013609281060928080_n.jpg';
import edwardianSuiteImg from '../../images/imgi_57_621638398_18156995347423941_1663061667988789409_n.jpg';

const rooms = [
  {
    name: 'The Ullswater Suite',
    image: tartanCanopyImg,
    tag: 'Signature Suite',
    description: 'Our signature suite featuring a hand-carved tartan canopy bed and breathtaking lake panoramas.',
    amenities: [
      { icon: Waves, label: 'Lakeside View' },
      { icon: BedDouble, label: 'Super King Bed' },
      { icon: Flame, label: 'Open Fireplace' },
    ],
  },
  {
    name: 'The Damask Canopy Room',
    image: damaskCanopyImg,
    tag: 'Lakeside Room',
    description: 'An elegant retreat adorned with rich antique blue damask upholstery and fine walnut furnishings.',
    amenities: [
      { icon: Waves, label: 'Lakeside View' },
      { icon: BedDouble, label: 'King Bed' },
      { icon: Flame, label: 'Velvet Lounge' },
    ],
  },
  {
    name: 'The Heritage Damask Room',
    image: heritageDamaskImg,
    tag: 'Garden Room',
    description: 'Exquisite bird-and-forest damask wall coverings frame a plush bed designed for unhurried rest.',
    amenities: [
      { icon: Waves, label: 'Garden View' },
      { icon: BedDouble, label: 'King Bed' },
      { icon: Flame, label: 'Victorian Fire' },
    ],
  },
  {
    name: 'The Edwardian Sitting Suite',
    image: edwardianSuiteImg,
    tag: 'Junior Suite',
    description: 'A grand junior suite featuring a cozy leather sofa, gilded sconces, and warm wood paneling.',
    amenities: [
      { icon: Waves, label: 'Estate Gardens' },
      { icon: BedDouble, label: 'King Bed' },
      { icon: Flame, label: 'Private Salon' },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.2,
    },
  }),
};

export default function Rooms() {
  return (
    <section id="rooms" className="bg-cream py-20 lg:py-28 border-t-0.5 border-gold">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 gap-4">
          <div className="w-full sm:w-auto">
            <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-gold uppercase mb-2 block">
              Sanctuary of Rest
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-forest tracking-wide">
              Rooms &amp; Suites
            </h2>
            <p className="font-serif text-base italic text-forest/50 mt-1">
              Each room a world apart — each view a painting.
            </p>
            <LuxuryDivider centered={false} />
          </div>
          <a
            href="#booking"
            className="text-[10px] font-sans font-bold tracking-[0.2em] text-gold uppercase group flex items-center gap-1 border-b border-transparent hover:border-gold pb-1 transition-all duration-300 flex-shrink-0"
          >
            View all rooms <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </div>

        {/* 2x2 Grid with separation gaps and individual borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {rooms.map((room, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={cardVariants}
              className="flex flex-col bg-[#FAF8F5] border border-gold/30 group overflow-hidden"
            >
              {/* Image Frame with gold double border overlay */}
              <div className="relative aspect-[3/2] overflow-hidden bg-[#5E4A35] border-b border-gold/30">
                <motion.img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover object-center select-none"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Vintage style label tag */}
                <div className="absolute top-5 left-5 bg-forest text-[9px] font-sans font-bold tracking-[0.2em] text-gold uppercase py-1.5 px-3 z-15 shadow-sm border border-gold/40">
                  {room.tag}
                </div>
              </div>

              {/* Room details */}
              <div className="p-8 flex flex-col flex-grow justify-between relative">
                {/* Inner decorative border - expands slightly on hover */}
                <div className="absolute inset-2 border border-gold/15 pointer-events-none group-hover:inset-1.5 group-hover:border-gold/40 transition-all duration-500 ease-out"></div>
                
                <div className="z-10">
                  <h3 className="font-serif text-2xl font-semibold text-forest mb-3 tracking-wide">
                    {room.name}
                  </h3>
                  <p className="font-serif text-[13px] text-forest/80 leading-relaxed mb-6 font-normal">
                    {room.description}
                  </p>
                </div>

                {/* Amenity Icons Row & Action */}
                <div className="flex justify-between items-center border-t border-gold/20 pt-5 mt-4 z-10">
                  <div className="flex flex-wrap gap-y-2 gap-x-4">
                    {room.amenities.map((amenity, keyIdx) => {
                      const Icon = amenity.icon;
                      return (
                        <div key={keyIdx} className="flex items-center space-x-1.5 text-forest/70">
                          <Icon size={14} strokeWidth={2} className="text-gold" />
                          <span className="text-[9px] font-sans font-bold uppercase tracking-wider">
                            {amenity.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <a
                    href="#booking"
                    className="text-[9px] font-sans font-bold tracking-[0.15em] text-gold uppercase border-b border-transparent hover:border-gold pb-0.5 transition-all duration-300 flex-shrink-0"
                  >
                    Reserve &rarr;
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
