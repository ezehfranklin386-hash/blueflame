import React, { useState, useEffect } from 'react';
import { CONTACT_CONFIG } from '../config';
import { validateForm } from '../utils/formValidation';
import FormField from './FormField';
import ContactItem from './ContactItem';

const initialFormData = { name: '', phone: '', amount: '', address: '' };
const initialErrors = { name: '', phone: '', amount: '', address: '' };
const initialStatus = { type: '', message: '' };

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
  const [status, setStatus] = useState(initialStatus);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const contactContainer = document.getElementById('contact-container');
    if (contactContainer) observer.observe(contactContainer);

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: '' });
    setStatus(initialStatus);
  };

  const getWeightForPrice = (price) => {
    const amount = Number(price);
    if (!price || Number.isNaN(amount) || amount <= 0) return 0;
    return amount / pricePerKg;
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
    setStatus(initialStatus);

    const { isValid, errors: validationErrors } = validateForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      setStatus({ type: 'error', message: 'Please fix the highlighted fields before submitting.' });
      return;
    }

    const message = buildOrderMessage(formData);
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    const opened = window.open(waUrl, '_blank');
    if (opened) {
      setStatus({ type: 'success', message: 'WhatsApp opened successfully. Your order message is ready to send.' });
      setFormData(initialFormData);
      setErrors(initialErrors);
      return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(message);
        setStatus({
          type: 'success',
          message: 'WhatsApp could not open automatically. The order details have been copied to your clipboard.'
        });
        setFormData(initialFormData);
        setErrors(initialErrors);
        return;
      } catch (copyError) {
        // Fallback below if clipboard write fails
      }
    }

    setStatus({
      type: 'error',
      message: 'Unable to open WhatsApp or copy the message. Please try again or contact us directly.'
    });
  };

  return (
    <section id="contact" className="contact">
      <div id="contact-container" className={`contact-container ${isVisible ? 'visible' : ''}`}>
        <div className="contact-info">
          <h3>Get In Touch</h3>
          <div className="contact-item">
            <span className="contact-item-icon">📞</span>
            <div>
              <strong>Phone:</strong>
              <br />
              {phone}
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-item-icon">📍</span>
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
            <span className="contact-item-icon">⏰</span>
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
            <span className="contact-item-icon">✉️</span>
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
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                aria-describedby="name-error"
                aria-invalid={!!errors.name}
                required
              />
              <span className="field-error" id="name-error" aria-live="assertive">{errors.name}</span>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                placeholder="08012345678"
                value={formData.phone}
                onChange={handleChange}
                aria-describedby="phone-error"
                aria-invalid={!!errors.phone}
                required
              />
              <span className="field-error" id="phone-error" aria-live="assertive">{errors.phone}</span>
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount (₦)</label>
              <input
                type="number"
                id="amount"
                placeholder="e.g., 5000"
                min={minOrderAmount}
                value={formData.amount}
                onChange={handleChange}
                aria-describedby="amount-error"
                aria-invalid={!!errors.amount}
                required
              />
              <span className="field-error" id="amount-error" aria-live="assertive">{errors.amount}</span>
              <div className="price-calculator-result">
                ≈ {getWeightForPrice(formData.amount).toFixed(2)} kg (₦{pricePerKg.toLocaleString()} = 1kg)
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <textarea
                id="address"
                placeholder="Your full delivery address"
                value={formData.address}
                onChange={handleChange}
                aria-describedby="address-error"
                aria-invalid={!!errors.address}
                required
              ></textarea>
              <span className="field-error" id="address-error" aria-live="assertive">{errors.address}</span>
            </div>
            {status.message && (
              <div className={`form-status ${status.type}`} role="status" aria-live="polite" aria-atomic="true">{status.message}</div>
            )}
            <button type="submit" className="btn btn-primary full-width">Submit Order</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
