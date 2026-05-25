import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import { motion } from 'framer-motion';
import LuxuryDivider from './LuxuryDivider';

// Import all 11 images
import img10 from '../../images/imgi_10_619398631_18104782633815406_5512556646401281546_n.jpg';
import img11 from '../../images/imgi_11_625102754_18332425525243826_2278774979383148005_n.jpg';
import img23 from '../../images/imgi_23_669871054_18579165646049144_3381738805117895049_n.jpg';
import img38 from '../../images/imgi_38_618950643_18142806421462446_1969784698008249469_n.jpg';
import img40_1 from '../../images/imgi_40_620477102_18141771580481126_5586506220430535281_n.jpg';
import img40_2 from '../../images/imgi_40_627955224_18351339748226796_609914740476861493_n.jpg';
import img45 from '../../images/imgi_45_641144906_18565385401041889_7442123594195650127_n.jpg';
import img46 from '../../images/imgi_46_619125492_18151786045430319_4512599629937519147_n.jpg';
import img51 from '../../images/imgi_51_530613712_1726505477994009_2013609281060928080_n.jpg';
import img57 from '../../images/imgi_57_621638398_18156995347423941_1663061667988789409_n.jpg';
import img58 from '../../images/imgi_58_625105046_18170342455389584_8808915844389402789_n.jpg';
import newImg1 from '../../images/1_SBH_Site-Photo-View-of-Sharrow-Bay-1536x1024.jpg';
import newImg2 from '../../images/5_SBH_1980-Owners-Francis-Coulson-and-Brian-Sack-1024x635.jpg';

// Gallery images with layout hints for an editorial masonry
// span: 'tall' = portrait aspect, 'wide' = landscape, 'normal' = square-ish
const galleryImages = [
  { src: newImg1, alt: 'Panoramic view of Sharrow Bay by Ullswater', category: 'The Lake', span: 'wide', placeholder: 'bg-[#3F4E5A]' },
  { src: newImg2, alt: 'Sharrow Bay owners Francis Coulson and Brian Sack, 1980', category: 'The Estate', span: 'normal', placeholder: 'bg-[#2D3A2E]' },
  { src: img58, alt: 'Lakeside dinner table at sunset', category: 'The Lake', span: 'tall', placeholder: 'bg-[#3F4E5A]' },
  { src: img38, alt: 'Tartan canopy bed suite', category: 'The Rooms', span: 'normal', placeholder: 'bg-[#5E4A35]' },
  { src: img45, alt: 'Lawn and flowerbeds next to Lakeland stone wall', category: 'The Gardens', span: 'normal', placeholder: 'bg-[#2D3A2E]' },
  { src: img23, alt: 'Lakeland stone entrance decorated', category: 'The Estate', span: 'tall', placeholder: 'bg-[#2D3A2E]' },
  { src: img40_1, alt: 'Damask canopy suite with striped armchair', category: 'The Rooms', span: 'normal', placeholder: 'bg-[#5E4A35]' },
  { src: img10, alt: 'Lakeside restaurant snow mountains view', category: 'Dining', span: 'normal', placeholder: 'bg-[#3F4E5A]' },
  { src: img40_2, alt: 'Afternoon tea tray set by bay window', category: 'Dining', span: 'wide', placeholder: 'bg-[#3F4E5A]' },
  { src: img11, alt: 'Cosy private dining birthday table set', category: 'Events', span: 'normal', placeholder: 'bg-[#5E4A35]' },
  { src: img46, alt: 'Gravel garden path between tall neat hedges', category: 'The Gardens', span: 'normal', placeholder: 'bg-[#2D3A2E]' },
  { src: img51, alt: 'Ornate damask headboard close-up', category: 'The Rooms', span: 'tall', placeholder: 'bg-[#5E4A35]' },
  { src: img57, alt: 'Leather sofa and dresser with decorative yellow china', category: 'The Estate', span: 'normal', placeholder: 'bg-[#5E4A35]' },
];

const categories = ['All', 'The Lake', 'The Rooms', 'Dining', 'The Estate', 'The Gardens', 'Events'];

export default function Gallery() {
  const [index, setIndex] = useState(-1);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  // slides array for lightbox – always full set so index stays correct
  const slides = galleryImages.map((img) => ({ src: img.src, alt: img.alt }));

  return (
    <section id="gallery" className="bg-[#1C1A16] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section Title */}
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="text-[10px] font-sans font-bold tracking-[0.35em] text-gold uppercase mb-3">
            Life at Sharrow Bay
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-cream tracking-wide">
            Our Photography Archive
          </h2>
          <LuxuryDivider centered={true} />
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[9px] font-sans font-bold tracking-[0.25em] uppercase px-5 py-2 border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gold text-cream border-gold'
                  : 'bg-transparent text-cream/50 border-cream/20 hover:text-gold hover:border-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Editorial masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, idx) => {
            const globalIdx = galleryImages.findIndex((g) => g.src === item.src);
            return (
              <motion.div
                key={item.src}
                layout
                className={`relative break-inside-avoid overflow-hidden cursor-pointer group ${item.placeholder}`}
                onClick={() => setIndex(globalIdx)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.08 }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-auto object-cover transform group-hover:scale-[1.04] transition-transform duration-700 ease-out select-none pointer-events-none"
                />

                {/* Category badge — always visible bottom-left */}
                <div className="absolute bottom-0 left-0 right-0 bg-forest/70 px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
                  <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-gold uppercase block mb-0.5">
                    {item.category}
                  </span>
                  <span className="font-serif text-sm font-medium text-cream italic leading-snug">
                    {item.alt}
                  </span>
                  <span className="text-[8px] font-sans font-bold uppercase tracking-widest text-cream/50 mt-2 block border-b border-cream/20 pb-0.5 w-fit">
                    View Fullscreen
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View count */}
        <div className="text-center mt-12">
          <p className="text-[10px] font-sans font-bold tracking-[0.3em] text-cream/30 uppercase">
            Showing {filtered.length} of {galleryImages.length} photographs
          </p>
        </div>

      </div>

      {/* Lightbox */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
      />
    </section>
  );
}
