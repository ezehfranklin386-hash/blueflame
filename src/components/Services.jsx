import React, { useEffect, useState } from 'react';

function Services() {
  const services = [
    { icon: '🏠', title: 'Domestic Gas Supply', desc: 'Regular gas refills for households. We deliver 3kg, 5kg, 6kg, 11kg, and 12.5kg cylinders right to your door.' },
    { icon: '🏢', title: 'Commercial Gas Supply', desc: 'Bulk gas supply for restaurants, hotels, and businesses. Competitive rates for high-volume customers.' },
    { icon: '🔄', title: 'Cylinder Exchange', desc: 'Empty cylinder for full cylinder exchange service. Fast, safe, and convenient.' },
    { icon: '🔧', title: 'Safety Inspection', desc: 'Free safety checks on your gas connections and equipment with every delivery.' },
    { icon: '📦', title: 'Accessories Sales', desc: 'Regulators, hoses, clamps, safety kits & more. All certified and warranty-backed.' },
    { icon: '🚚', title: 'Scheduled Delivery', desc: 'Set up automatic monthly deliveries so you never run out of gas unexpectedly.' }
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

    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="services">
      <h2 className="section-title">Our Services</h2>
      <p className="section-subtitle">Complete gas solutions for your home and business</p>
      <div className="services-grid">
        {services.map((service, idx) => (
          <div key={idx} id={`service-${idx}`} className={`service-card animate-on-scroll ${visibleCards.has(`service-${idx}`) ? 'visible' : ''}`}>
            <h3>{service.icon} {service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
