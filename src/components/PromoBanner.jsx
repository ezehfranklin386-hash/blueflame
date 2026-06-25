import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function PromoBanner({ image, title, subtitle, ctaText, ctaLink, reverse }) {
  return (
    <motion.section
      className={`promo-banner ${reverse ? 'reverse' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8 }}
    >
      <div className="promo-banner-image">
        <img src={image} alt={title} loading="lazy" />
      </div>
      <div className="promo-banner-content">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        {ctaText && (
          <a href={ctaLink || '#products'} className="btn btn-primary">
            {ctaText} <ArrowRight size={20} />
          </a>
        )}
      </div>
    </motion.section>
  );
}

export default PromoBanner;
