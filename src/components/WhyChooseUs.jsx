import React, { useEffect, useState } from 'react';

function WhyChooseUs() {
  const reasons = [
    { num: 1, title: 'DPR Certified', desc: 'Fully licensed and compliant with all Nigerian gas safety regulations' },
    { num: 2, title: 'Quality Guaranteed', desc: 'Pure LPG gas with accurate weight measurement on every refill' },
    { num: 3, title: 'Trained Personnel', desc: 'Our delivery team is trained in safe handling and installation' },
    { num: 4, title: '24/7 Support', desc: 'Customer service available to answer your questions anytime' }
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

    const cards = document.querySelectorAll('.why-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-us" className="why-us">
      <h2 className="section-title" style={{ color: 'var(--secondary)' }}>Why Choose Blue Flame Gas?</h2>
      <p className="section-subtitle">We put safety and customer satisfaction first</p>
      <div className="why-grid">
        {reasons.map((reason, idx) => (
          <div key={idx} id={`why-${idx}`} className={`why-card animate-on-scroll ${visibleCards.has(`why-${idx}`) ? 'visible' : ''}`}>
            <div className="why-number">{reason.num}</div>
            <div><h3>{reason.title}</h3><p>{reason.desc}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;
