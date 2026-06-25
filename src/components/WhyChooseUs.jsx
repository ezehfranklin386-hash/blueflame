import React from 'react';
import { motion } from 'framer-motion';

function WhyChooseUs() {
  const reasons = [
    { num: 1, title: 'DPR Certified', desc: 'Fully licensed and compliant with all Nigerian gas safety regulations' },
    { num: 2, title: 'Quality Guaranteed', desc: 'Pure LPG gas with accurate weight measurement on every refill' },
    { num: 3, title: 'Trained Personnel', desc: 'Our delivery team is trained in safe handling and installation' },
    { num: 4, title: '24/7 Support', desc: 'Customer service available to answer your questions anytime' }
  ];

  return (
    <section id="why-us" className="why-us">
      <h2 className="section-title" style={{ color: 'var(--secondary)' }}>Why Choose Blue Flame Gas?</h2>
      <p className="section-subtitle">We put safety and customer satisfaction first</p>
      <div className="why-grid">
        {reasons.map((reason, idx) => (
          <motion.div
            key={idx}
            className="why-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <div className="why-number">{reason.num}</div>
            <div><h3>{reason.title}</h3><p>{reason.desc}</p></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;
