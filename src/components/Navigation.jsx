import React, { useState, useEffect } from 'react';

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="nav-container">
        <a href="#" className="logo" onClick={closeMobileMenu}>
          <img src="logo.png" alt="Blue Flame Gas Logo" />
          <span className="logo-text">
            Blue Flame<br /><span>Gas Supply LTD</span>
          </span>
        </a>
        <div className="nav-links">
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact" className="nav-cta">Order Now</a>
        </div>
        <button
          type="button"
          className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="menu-icon"></span>
        </button>
      </div>
      {mobileMenuOpen && (
        <div id="mobile-menu" className="mobile-menu active">
          <ul>
            <li><a href="#products" onClick={closeMobileMenu}>Products</a></li>
            <li><a href="#about" onClick={closeMobileMenu}>About</a></li>
            <li><a href="#services" onClick={closeMobileMenu}>Services</a></li>
            <li><a href="#contact" className="nav-cta" onClick={closeMobileMenu}>Order Now</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
