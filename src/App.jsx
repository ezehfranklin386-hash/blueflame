import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PromoBanner from './components/PromoBanner';
import Features from './components/Features';
import Products from './components/Products';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="app">
      <Navigation />
      <Hero />
      <PromoBanner
        image="/images/promo-banner-1.png"
        title="Best Prices in Lagos"
        subtitle="Affordable LPG from ₦1,800/kg — no hidden charges, same quality guaranteed."
        ctaText="View Prices"
        ctaLink="#products"
      />
      <Features />
      <Products />
      <PromoBanner
        image="/images/promo-banner-2.png"
        title="Lightning-Fast Delivery"
        subtitle="Order before 3PM and get your gas delivered same-day across Ibeju-Lekki, Ajah &amp; VI."
        ctaText="Order Now"
        ctaLink="#products"
        reverse
      />
      <About />
      <Services />
      <WhyChooseUs />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
