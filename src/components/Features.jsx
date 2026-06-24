import React, { useEffect, useState } from 'react';
import { Zap, Shield, DollarSign, MapPin } from 'lucide-react';

function Features() {
  const features = [
    { icon: Zap, title: 'Fast Delivery', desc: 'Same-day delivery available across Lagos metropolis' },
    { icon: Shield, title: 'Safe & Certified', desc: 'DPR certified gas with safety-checked cylinders' },
    { icon: DollarSign, title: 'Best Prices', desc: 'Competitive pricing with no hidden charges' },
    { icon: MapPin, title: 'Wide Coverage', desc: 'Serving Ibeju-Lekki, Ajah, Victoria Island & more' }
  ];

  const [visibleCards, setVisibleCards] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="features">
      <div className="features-grid">
        {features.map((feature, idx) => (
          <div key={idx} id={`feature-${idx}`} className={`feature-card animate-on-scroll ${visibleCards.has(`feature-${idx}`) ? 'visible' : ''}`}>
            <div className="feature-icon"><feature.icon size={48} /></div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
