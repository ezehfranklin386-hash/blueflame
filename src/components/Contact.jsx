import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { CONTACT_CONFIG } from '../config';
import { supabase } from '../supabase';
import { validateForm } from '../utils/formValidation';
import FormField from './FormField';
import ContactItem from './ContactItem';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';

const initialFormData = { name: '', phone: '', amount: '', address: '' };
const initialErrors = { name: '', phone: '', amount: '', address: '' };

function Contact() {
  const {
    whatsappNumber,
    pricePerKg,
    minOrderAmount,
    phone,
    email,
    addressLines,
    hours
  } = CONTACT_CONFIG;

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [livePricePerKg, setLivePricePerKg] = useState(null);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('gas_prices')
      .select('price_per_kg')
      .single()
      .then(({ data }) => {
        if (data?.price_per_kg) setLivePricePerKg(data.price_per_kg);
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: '' });
  };

  const effectivePricePerKg = livePricePerKg || pricePerKg;

  const getWeightForPrice = (price) => {
    const amount = Number(price);
    if (!price || Number.isNaN(amount) || amount <= 0) return 0;
    return amount / effectivePricePerKg;
  };

  const buildOrderMessage = (data) =>
    `New Order Request! 🚚
Name: ${data.name}
Phone: ${data.phone}
Budget: ₦${data.amount}
Approx. Weight: ${getWeightForPrice(data.amount).toFixed(2)} kg
Address: ${data.address}

Please contact this customer to confirm their order.`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateForm(formData, minOrderAmount);
    if (!isValid) {
      setErrors(validationErrors);
      toast.error('Please fix the highlighted fields before submitting.');
      return;
    }

    const message = buildOrderMessage(formData);
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    const opened = window.open(waUrl, '_blank');
    if (opened) {
      toast.success('WhatsApp opened successfully. Your order message is ready to send.');
      setFormData(initialFormData);
      setErrors(initialErrors);
      return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(message);
        toast.success('WhatsApp could not open automatically. The order details have been copied to your clipboard.');
        setFormData(initialFormData);
        setErrors(initialErrors);
        return;
      } catch (copyError) {
        // Fallback below if clipboard write fails
      }
    }

    toast.error('Unable to open WhatsApp or copy the message. Please try again or contact us directly.');
  };

  return (
    <section id="contact" className="contact">
      <motion.div
        className="contact-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="contact-info">
          <h3>Get In Touch</h3>
          <div className="contact-item">
            <span className="contact-item-icon"><Phone size={20} /></span>
            <div>
              <strong>Phone:</strong>
              <br />
              {phone}
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-item-icon"><MapPin size={20} /></span>
            <div>
              <strong>Address:</strong>
              <br />
              {addressLines.map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-item-icon"><Clock size={20} /></span>
            <div>
              <strong>Hours:</strong>
              <br />
              {hours.map((entry, index) => (
                <span key={index}>
                  {entry}
                  <br />
                </span>
              ))}
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-item-icon"><Mail size={20} /></span>
            <div>
              <strong>Email:</strong>
              <br />
              {email}
            </div>
          </div>
        </div>
        <div className="contact-form">
          <h3>Request a Delivery</h3>
          <form onSubmit={handleSubmit} noValidate>
            <FormField id="name" label="Full Name" placeholder="Your name" value={formData.name} onChange={handleChange} error={errors.name} required />
            <FormField id="phone" label="Phone Number" type="tel" placeholder="08012345678" value={formData.phone} onChange={handleChange} error={errors.phone} required />
            <FormField id="amount" label="Amount (₦)" type="number" placeholder="e.g., 5000" minValue={minOrderAmount} value={formData.amount} onChange={handleChange} error={errors.amount} required />
            <div className="price-calculator-result">
              ≈ {getWeightForPrice(formData.amount).toFixed(2)} kg (₦{effectivePricePerKg.toLocaleString()} = 1kg)
            </div>
            <FormField id="address" label="Delivery Address" type="textarea" placeholder="Your full delivery address" value={formData.address} onChange={handleChange} error={errors.address} required />
            <button type="submit" className="btn btn-primary full-width">Submit Order</button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;
