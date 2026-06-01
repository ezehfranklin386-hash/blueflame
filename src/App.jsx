import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
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
      <Features />
      <Products />
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
