import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Truck } from 'lucide-react';

function About() {
  return (
    <section id="about" className="about">
      <div className="about-content">
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Your Trusted Gas Partner in Lagos</h2>
          <p>Blue Flame Gas Supply Limited is a leading LPG gas supplier committed to providing safe, reliable, and affordable gas solutions to homes and businesses across Lagos State.</p>
          <p>With years of experience and a dedication to customer satisfaction, we ensure every delivery meets the highest safety standards. Our team is trained to handle gas cylinders with care and professionalism.</p>
          <p><strong><MapPin size={14} style={{display: 'inline'}} /> Location:</strong> Blue Flame Gas Depot, Uba Pharmacy Road, Awoyaya, Ibeju-Lekki, Lagos State</p>
        </motion.div>
        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="image-content">
            <h3><Truck size={24} style={{display: 'inline'}} /> Fast & Reliable</h3>
            <p>Same-Day Gas Delivery</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
