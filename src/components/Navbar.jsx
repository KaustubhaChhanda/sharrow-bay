import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../../images/logo-gold-200.png';

const navLinks = [
  { name: 'Rooms & Suites', href: '#rooms' },
  { name: 'Dining', href: '#dining' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Events', href: '#events' },
  { name: 'Our Story', href: '#story' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-forest border-b border-gold/15 transition-all duration-500 ease-in-out ${
          isScrolled ? 'py-2 shadow-sm' : 'py-4'
        }`}
      >
        <motion.div
          className="w-full"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-4">
            {/* Left - Brand Identity */}
            <a href="#" className="flex items-center gap-3 select-none group flex-shrink-0 whitespace-nowrap">
              <img
                src={logo}
                alt="Sharrow Bay Logo"
                className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl lg:text-2xl font-bold tracking-wide text-cream group-hover:text-gold transition-colors duration-300">
                  Sharrow Bay
                </span>
                <span className="text-[9px] font-sans font-bold tracking-[0.2em] text-gold uppercase mt-0.5">
                  Est. 1948 &middot; Ullswater
                </span>
              </div>
            </a>

            {/* Centre - Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 flex-shrink-0">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[9.5px] font-sans font-bold tracking-[0.2em] text-cream/90 hover:text-gold uppercase transition-colors duration-300 relative py-1 group whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-full h-[0.5px] bg-gold scale-x-0 transition-transform duration-300 origin-center group-hover:scale-x-100"></span>
                </a>
              ))}
            </nav>

            {/* Right - Call to Actions (Desktop) */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4 flex-shrink-0">
              <a
                href="#dining"
                onClick={(e) => handleNavClick(e, '#dining')}
                className="text-[9.5px] font-sans font-bold tracking-[0.15em] text-gold border border-gold px-4 py-2 uppercase hover:bg-gold hover:text-forest transition-all duration-300 whitespace-nowrap"
              >
                Reserve a Table
              </a>
              <a
                href="#booking"
                onClick={(e) => handleNavClick(e, '#booking')}
                className="text-[9.5px] font-sans font-bold tracking-[0.15em] bg-gold text-forest px-4 py-2 uppercase hover:bg-cream hover:text-forest border border-gold hover:border-cream transition-all duration-300 whitespace-nowrap"
              >
                Book a Stay
              </a>
            </div>

            {/* Hamburger Menu Trigger (Mobile) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-cream hover:text-gold transition-colors p-1"
              aria-label="Open navigation menu"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>
      </header>

      {/* Fullscreen Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-forest flex flex-col justify-between p-8 text-cream"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Sharrow Bay Logo"
                  className="h-10 w-auto object-contain filter brightness-[1.2]"
                />
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-medium tracking-wide">
                    Sharrow Bay
                  </span>
                  <div className="text-[9px] font-sans font-semibold tracking-[0.2em] text-gold uppercase mt-0.5">
                    Est. 1948 &middot; Ullswater
                  </div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-cream hover:text-gold transition-colors p-1"
                aria-label="Close navigation menu"
              >
                <X size={28} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 my-auto pl-4">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xl font-serif tracking-wide text-cream hover:text-gold uppercase"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx, duration: 0.3 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col space-y-4 pt-6 border-t border-cream/10">
              <a
                href="#dining"
                onClick={(e) => handleNavClick(e, '#dining')}
                className="text-center text-xs font-sans font-medium tracking-[0.2em] text-cream border border-cream/30 py-3.5 uppercase hover:border-gold hover:text-gold transition-colors duration-300"
              >
                Reserve a Table
              </a>
              <a
                href="#booking"
                onClick={(e) => handleNavClick(e, '#booking')}
                className="text-center text-xs font-sans font-medium tracking-[0.2em] bg-gold text-cream py-3.5 uppercase hover:bg-cream hover:text-forest transition-colors duration-300"
              >
                Book a Stay
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
