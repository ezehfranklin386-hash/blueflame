import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, RefreshCw, Wrench, Package, Truck } from 'lucide-react';

function Services() {
  const services = [
    { icon: Home, title: 'Domestic Gas Supply', desc: 'Regular gas refills for households. We deliver 3kg, 5kg, 6kg, 11kg, and 12.5kg cylinders right to your door.' },
    { icon: Building2, title: 'Commercial Gas Supply', desc: 'Bulk gas supply for restaurants, hotels, and businesses. Competitive rates for high-volume customers.' },
    { icon: RefreshCw, title: 'Cylinder Exchange', desc: 'Empty cylinder for full cylinder exchange service. Fast, safe, and convenient.' },
    { icon: Wrench, title: 'Safety Inspection', desc: 'Free safety checks on your gas connections and equipment with every delivery.' },
    { icon: Package, title: 'Accessories Sales', desc: 'Regulators, hoses, clamps, safety kits & more. All certified and warranty-backed.' },
    { icon: Truck, title: 'Scheduled Delivery', desc: 'Set up automatic monthly deliveries so you never run out of gas unexpectedly.' }
  ];

  return (
    <section id="services" className="services">
      <h2 className="section-title">Our Services</h2>
      <p className="section-subtitle">Complete gas solutions for your home and business</p>
      <div className="services-grid">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            className="service-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <h3><service.icon size={28} /> {service.title}</h3>
            <p>{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Services;
