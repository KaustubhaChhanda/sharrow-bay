import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-forest text-cream py-16 lg:py-20 border-t border-gold/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <span className="font-serif text-2xl font-medium tracking-wide text-cream select-none">
              Sharrow Bay
            </span>
            <span className="text-[9px] font-sans font-semibold tracking-[0.2em] text-gold uppercase mt-1 mb-6">
              Est. 1948 &middot; Ullswater
            </span>
            <p className="font-sans text-xs text-cream/60 leading-relaxed tracking-wider mb-6 max-w-xs">
              Ullswater, Penrith, Cumbria, CA10 2LZ, United Kingdom
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-gold/40 flex items-center justify-center text-gold hover:text-cream hover:border-cream transition-colors duration-300"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={14} strokeWidth={1.5} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-gold/40 flex items-center justify-center text-gold hover:text-cream hover:border-cream transition-colors duration-300"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={14} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-sans font-bold tracking-[0.25em] text-gold uppercase mb-6">
              The Estate
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'Rooms & Suites', href: '#rooms' },
                { name: 'Our Story', href: '#story' },
                { name: 'Gallery Archive', href: '#gallery' },
                { name: 'Guest Reviews', href: '#reviews' },
                { name: 'Book a Stay', href: '#booking' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-[11px] font-sans font-bold text-cream/70 hover:text-gold uppercase tracking-wider transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Dining Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-sans font-bold tracking-[0.25em] text-gold uppercase mb-6">
              Gastronomy
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'Lakeside Restaurant', href: '#dining' },
                { name: 'Afternoon Tea', href: '#dining' },
                { name: 'Private Events', href: '#events' },
                { name: 'Reserve a Table', href: '#dining' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-[11px] font-sans font-bold text-cream/70 hover:text-gold uppercase tracking-wider transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <h3 className="text-[10px] font-sans font-bold tracking-[0.25em] text-gold uppercase mb-6">
              Inquiries
            </h3>
            <ul className="space-y-4 text-xs font-sans text-cream/70 tracking-wider">
              <li>
                <span className="block text-[9px] font-sans font-bold text-gold uppercase tracking-widest mb-1">
                  Telephone
                </span>
                <a
                  href="tel:+441768486301"
                  className="hover:text-gold transition-colors duration-300 font-semibold"
                >
                  +44 (0) 17684 86301
                </a>
              </li>
              <li>
                <span className="block text-[9px] font-sans font-bold text-gold uppercase tracking-widest mb-1">
                  Email
                </span>
                <a
                  href="mailto:info@sharrowbay.co.uk"
                  className="hover:text-gold transition-colors duration-300 font-semibold"
                >
                  info@sharrowbay.co.uk
                </a>
              </li>
              <li>
                <span className="block text-[9px] font-sans font-bold text-gold uppercase tracking-widest mb-1">
                  Website
                </span>
                <a
                  href="https://sharrowbay.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors duration-300 font-semibold"
                >
                  sharrowbay.co.uk
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t-0.5 border-gold/30 pt-8 flex flex-col sm:flex-row items-center justify-between text-[9px] font-sans tracking-[0.25em] uppercase text-cream/40 space-y-4 sm:space-y-0">
          <span>
            &copy; {new Date().getFullYear()} Sharrow Bay Hotel. All rights reserved.
          </span>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              Terms of Use
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
