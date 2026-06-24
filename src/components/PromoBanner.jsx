import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

function PromoBanner({ image, title, subtitle, ctaText, ctaLink, reverse }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`promo-banner ${reverse ? 'reverse' : ''} ${visible ? 'visible' : ''}`}
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
    </section>
  );
}

export default PromoBanner;
