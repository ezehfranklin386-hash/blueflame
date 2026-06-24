import React from 'react';
import { Phone, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <img src="logo.png" alt="Blue Flame Gas Logo" style={{ height: '80px', marginBottom: '15px' }} />
          <h4>BLUE FLAME GAS SUPPLY LTD</h4>
          <p>Reliable LPG gas supply and delivery services across Lagos State.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="#products">Products</a>
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p><Phone size={14} style={{display: 'inline'}} /> 08106606098</p>
          <p><MapPin size={14} style={{display: 'inline'}} /> Ibeju-Lekki, Lagos</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">WhatsApp</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Blue Flame Gas Supply Limited. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
