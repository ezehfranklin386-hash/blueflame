import React from 'react';
import { Flame, Phone } from 'lucide-react';

function Hero() {
  return (
    <section className="hero">
      <h1>Reliable <span>Gas Supply</span><br />Delivered to Your Door</h1>
      <p>Blue Flame Gas Supply LTD provides safe, affordable, and timely LPG gas delivery across Lagos. Order cylinders & accessories with same-day delivery!</p>
      <div className="hero-btns">
        <a href="#products" className="btn btn-primary"><Flame size={20} /> Shop Now</a>
        <a href="tel:08106606098" className="btn btn-outline"><Phone size={20} /> Call: 08106606098</a>
      </div>
    </section>
  );
}

export default Hero;
