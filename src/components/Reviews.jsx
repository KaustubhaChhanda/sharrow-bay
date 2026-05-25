import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import LuxuryDivider from './LuxuryDivider';

// Swiper styles are imported in main.jsx

const reviews = [
  {
    stars: 5,
    quote: 'To sit by the window with a cup of tea, watching the clouds roll over the Lakeland fells, is close to heaven. Sharrow Bay has captured a style of British hospitality that is almost lost today.',
    author: 'Sarah & Arthur M.',
    date: 'October 2025',
  },
  {
    stars: 5,
    quote: 'The lakeside dining is spectacular, but it is the sticky toffee pudding that lingers in the memory. A masterclass in country house service: warm, attentive, and completely unhurried.',
    author: 'Lord Edward P.',
    date: 'January 2026',
  },
  {
    stars: 5,
    quote: 'A breathtaking lakeside retreat. The tartan canopy bed in the Ullswater Suite made us feel like we had stepped back into a grander, quieter era. Truly Cumbria\'s finest gem.',
    author: 'Evelyn & Thomas W.',
    date: 'April 2026',
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="bg-cream py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-gold uppercase mb-3">
            Guest Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-forest tracking-wide">
            Voices of Sharrow Bay
          </h2>
          <LuxuryDivider centered={true} />
        </div>

        {/* Swiper Slider (Mobile-first responsive configuration) */}
        <div className="w-full">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={true}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
                navigation: false, // Hide navigation buttons on desktop
              },
            }}
            className="pb-16"
          >
            {reviews.map((review, idx) => (
              <SwiperSlide key={idx} className="flex flex-col">
                <motion.div
                  whileHover={{ 
                    y: -6, 
                    boxShadow: '0 12px 30px rgba(168, 129, 58, 0.08)' 
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#FAF8F5] border border-gold/15 p-8 flex flex-col justify-between h-full hover:border-gold/50 transition-colors duration-300 relative group overflow-hidden"
                >

                  {/* Decorative background quote mark */}
                  <span className="absolute right-6 top-2 text-9xl font-serif text-gold/5 select-none pointer-events-none group-hover:text-gold/8 group-hover:-translate-y-1 transition-all duration-500 z-0">
                    &ldquo;
                  </span>

                  <div className="z-10 relative">
                    {/* Stars */}
                    <div className="flex space-x-1 mb-6">
                      {[...Array(review.stars)].map((_, i) => (
                        <Star key={i} size={14} className="text-gold fill-gold" />
                      ))}
                    </div>

                    {/* Guest Quote */}
                    <p className="font-serif text-[14px] italic text-forest/90 leading-relaxed font-normal mb-8">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                  </div>

                  {/* Guest Info */}
                  <div className="border-t border-gold/20 pt-4 z-10 relative">
                    <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-forest uppercase block">
                      {review.author}
                    </span>
                    <span className="text-[9px] font-sans font-semibold text-slate-muted tracking-widest uppercase mt-0.5 block">
                      {review.date}
                    </span>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Footer badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mt-6">
          {/* TripAdvisor Badge Placeholder */}
          <div className="flex items-center space-x-3 border border-gold/15 px-6 py-3 bg-cream select-none">
            <div className="w-6 h-6 bg-gold text-cream flex items-center justify-center font-bold text-sm">
              oO
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[8px] font-sans font-semibold tracking-widest uppercase text-forest/70">
                TripAdvisor
              </span>
              <span className="text-[9px] font-sans font-bold text-gold tracking-wider uppercase">
                5.0 &middot; Excellent
              </span>
            </div>
          </div>

          <a
            href="https://tripadvisor.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-sans font-semibold tracking-[0.2em] text-gold uppercase border-b border-transparent hover:border-gold pb-0.5 transition-all duration-300"
          >
            Read all reviews
          </a>
        </div>

      </div>
    </section>
  );
}
