import React, { useState, useEffect } from 'react';

function Contact() {
  const WHATSAPP_NUMBER = '2348106606098';
  const [formData, setFormData] = useState({ name: '', phone: '', amount: '', address: '' });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `New Order Request! 🚚
Name: ${formData.name}
Phone: ${formData.phone}
Budget: ₦${formData.amount}
Address: ${formData.address}

Please contact this customer to confirm their order.`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    setFormData({ name: '', phone: '', amount: '', address: '' });
    alert('Thank you! Your order request has been sent via WhatsApp.');
  };

  return (
    <section id="contact" className="contact">
      <div id="contact-container" className={`contact-container ${isVisible ? 'visible' : ''}`}>
        <div className="contact-info">
          <h3>Get In Touch</h3>
          <div className="contact-item">
            <span className="contact-item-icon">📞</span>
            <div><strong>Phone:</strong><br />08106606098</div>
          </div>
          <div className="contact-item">
            <span className="contact-item-icon">📍</span>
            <div><strong>Address:</strong><br />Blue Flame Gas Depot<br />Uba Pharmacy Road, Awoyaya<br />Ibeju-Lekki, Lagos State</div>
          </div>
          <div className="contact-item">
            <span className="contact-item-icon">⏰</span>
            <div><strong>Hours:</strong><br />Mon-Sat: 7AM-9PM<br />Sunday: 9AM-6PM</div>
          </div>
          <div className="contact-item">
            <span className="contact-item-icon">✉️</span>
            <div><strong>Email:</strong><br />blueflamesgassupply@gmail.com</div>
          </div>
        </div>
        <div className="contact-form">
          <h3>Request a Delivery</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" placeholder="08012345678" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount (₦)</label>
              <input type="number" id="amount" placeholder="e.g., 5000" min="1300" value={formData.amount} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <textarea id="address" placeholder="Your full delivery address" value={formData.address} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Order</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
