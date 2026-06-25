import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, DollarSign, MapPin } from 'lucide-react';

function Features() {
  const features = [
    { icon: Zap, title: 'Fast Delivery', desc: 'Same-day delivery available across Lagos metropolis' },
    { icon: Shield, title: 'Safe & Certified', desc: 'DPR certified gas with safety-checked cylinders' },
    { icon: DollarSign, title: 'Best Prices', desc: 'Competitive pricing with no hidden charges' },
    { icon: MapPin, title: 'Wide Coverage', desc: 'Serving Ibeju-Lekki, Ajah, Victoria Island & more' }
  ];

  return (
    <section className="features">
      <div className="features-grid">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <div className="feature-icon"><feature.icon size={48} /></div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Features;
