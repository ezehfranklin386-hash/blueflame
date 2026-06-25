import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

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
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setDark(prev => !prev)}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
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
            <li>
              <button
                type="button"
                className="mobile-theme-toggle"
                onClick={() => setDark(prev => !prev)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '15px 20px', color: 'var(--secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />} {dark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
            <li><a href="#contact" className="nav-cta" onClick={closeMobileMenu}>Order Now</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
