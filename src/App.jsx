import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeritageStrip from './components/HeritageStrip';
import Introduction from './components/Introduction';
import Rooms from './components/Rooms';
import Dining from './components/Dining';
import AfternoonTea from './components/AfternoonTea';
import Gallery from './components/Gallery';
import Events from './components/Events';
import OurStory from './components/OurStory';
import Reviews from './components/Reviews';
import BookingWidget from './components/BookingWidget';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

export default function App() {
  return (
    <div className="min-h-screen bg-cream font-sans text-forest selection:bg-gold selection:text-cream">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Page Layout */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Heritage Stat Strip */}
        <HeritageStrip />

        {/* Core History Introduction */}
        <Introduction />

        {/* Rooms & Suites Grid */}
        <Rooms />

        {/* Dining Half-Split Screen */}
        <Dining />

        {/* Afternoon Tea Dark Section */}
        <AfternoonTea />

        {/* Full Image Gallery Archive & Lightbox */}
        <Gallery />

        {/* Events & Private Occasions Panel */}
        <Events />

        {/* Historic Timeline Column */}
        <OurStory />

        {/* Carousel Testimonials */}
        <Reviews />

        {/* React Hook Form Availability Calendar */}
        <BookingWidget />
      </main>

      {/* Footer Navigation */}
      <Footer />

      {/* Floating AI Concierge Chatbot */}
      <Chatbot />
    </div>
  );
}
