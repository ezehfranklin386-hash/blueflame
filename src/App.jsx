import { useMemo, useState } from 'react';

const WHATSAPP_NUMBER = '2348106606098';
const DEFAULT_PRICE = 950;

const productItems = [
  {
    id: 1,
    name: 'Premium Gas Cylinder',
    price: 42000,
    description: 'Safe, reliable, and ready-to-use for home or business delivery.',
    image: '/images/product-1.svg'
  },
  {
    id: 2,
    name: 'Gas Refill Service',
    price: 35000,
    description: 'Fast refill service delivered quickly to your door.',
    image: '/images/product-2.svg'
  },
  {
    id: 3,
    name: 'Bulk Supply',
    price: 28000,
    description: 'Discounted bulk delivery for frequent customers and businesses.',
    image: '/images/product-3.svg'
  }
];

const formatCurrency = value => `₦${Number(value || 0).toLocaleString()}`;

const App = () => {
  const [pricePerKg, setPricePerKg] = useState(DEFAULT_PRICE);
  const [customerAmount, setCustomerAmount] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactBudget, setContactBudget] = useState('');
  const [contactAddress, setContactAddress] = useState('');

  const totalKg = useMemo(() => {
    const amount = Number(customerAmount) || 0;
    return pricePerKg > 0 ? amount / pricePerKg : 0;
  }, [customerAmount, pricePerKg]);

  const sendWhatsAppMessage = message => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleOrderClick = product => {
    const msg = `Hello Blue Flame Gas! 🔥\nI want to order:\n- Product: ${product.name}\n- Quantity: 1\n- Price: ${formatCurrency(product.price)}\n\nPlease confirm availability.`;
    sendWhatsAppMessage(msg);
  };

  const handleCalculateSend = () => {
    const amount = Number(customerAmount) || 0;
    if (amount <= 0) {
      alert('Please enter a valid amount to calculate.');
      return;
    }

    const msg = `Delivery Calculation 🔥\n- Amount: ${formatCurrency(amount)}\n- Gas Price: ${formatCurrency(pricePerKg)}/KG\n- Quantity: ${totalKg.toFixed(2)} KG\n\nPlease confirm this delivery.`;
    sendWhatsAppMessage(msg);
  };

  const handleContactSubmit = event => {
    event.preventDefault();

    if (!contactName || !contactPhone || !contactBudget || !contactAddress) {
      alert('Please complete all contact fields before sending.');
      return;
    }

    const msg = `New Order Request! 🚚\nName: ${contactName}\nPhone: ${contactPhone}\nBudget: ${formatCurrency(contactBudget)}\nAddress: ${contactAddress}\n\nPlease contact this customer to confirm their order.`;

    sendWhatsAppMessage(msg);
    setContactName('');
    setContactPhone('');
    setContactBudget('');
    setContactAddress('');
    alert('Thank you! Your order request has been sent via WhatsApp.');
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand-bar">
          <div className="brand-logo">
            <img src="/logo.svg" alt="Blue Flame Logo" />
            <div>
              <strong>Blue Flame</strong>
              <span>Trusted Gas Supply</span>
            </div>
          </div>
          <button
            className="nav-toggle"
            onClick={() => setIsMenuOpen(open => !open)}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav className={`site-nav ${isMenuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#products" onClick={() => setIsMenuOpen(false)}>Products</a>
          <a href="#calculator" onClick={() => setIsMenuOpen(false)}>Calculator</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
          <a href="admin.html" className="admin-link">Admin</a>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-copy">
            <span className="eyebrow">24/7 cylinder delivery</span>
            <h1>Gas delivered fast, safe, and affordable.</h1>
            <p>Blue Flame keeps your kitchen burning with dependable gas supply, live pricing, and local delivery across town.</p>
            <div className="hero-actions">
              <button onClick={() => sendWhatsAppMessage('Hello Blue Flame Gas! I want to place an order.')}>Order via WhatsApp</button>
              <button className="secondary-btn" onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}>Delivery Calculator</button>
            </div>
          </div>
          <div className="hero-visual">
            <img src="/images/hero.svg" alt="Blue Flame delivery" />
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-card">
            <strong>150+</strong>
            <span>Daily Deliveries</span>
          </div>
          <div className="stat-card">
            <strong>4.9/5</strong>
            <span>Customer Rating</span>
          </div>
          <div className="stat-card">
            <strong>30 mins</strong>
            <span>Average Delivery</span>
          </div>
        </section>

        <section className="features" id="features">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Delivery</h3>
              <p>Same-day delivery available across Lagos metropolis.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Safe & Certified</h3>
              <p>DPR certified gas with safety-checked cylinders.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive pricing with no hidden charges.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3>Wide Coverage</h3>
              <p>Serving Ibeju-Lekki, Ajah, Victoria Island & more.</p>
            </div>
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="section-header">
            <div>
              <span className="eyebrow">Our offerings</span>
              <h2>Ready to order gas products</h2>
            </div>
            <p>Choose the package that fits your home or business, then contact us directly on WhatsApp.</p>
          </div>

          <div className="product-grid">
            {productItems.map(product => (
              <article className="product-card" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="product-content">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-footer">
                    <span>{formatCurrency(product.price)}</span>
                    <button onClick={() => handleOrderClick(product)}>Order</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="calculator-section" id="calculator">
          <div className="section-header">
            <div>
              <span className="eyebrow">Price calculator</span>
              <h2>Estimate gas quantity from your budget</h2>
            </div>
            <p>Enter the amount you want to spend and see how many kilograms of gas you can get.</p>
          </div>

          <div className="calculator-grid">
            <div className="calculator-card">
              <label htmlFor="budget">Your amount</label>
              <input
                id="budget"
                type="number"
                min="0"
                placeholder="Enter amount in Naira"
                value={customerAmount}
                onChange={e => setCustomerAmount(e.target.value)}
              />

              <label htmlFor="price">Current price per KG</label>
              <input
                id="price"
                type="number"
                min="1"
                value={pricePerKg}
                onChange={e => setPricePerKg(Number(e.target.value) || DEFAULT_PRICE)}
              />

              <div className="calculator-results">
                <div>
                  <span>Estimated Quantity</span>
                  <strong>{totalKg.toFixed(2)} KG</strong>
                </div>
                <div>
                  <span>Total value</span>
                  <strong>{formatCurrency(customerAmount)}</strong>
                </div>
              </div>

              <button onClick={handleCalculateSend}>Send estimate via WhatsApp</button>
            </div>
            <div className="calculator-visual">
              <img src="/images/calculator-illustration.svg" alt="Delivery calculation" />
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="section-header">
            <div>
              <span className="eyebrow">Why Blue Flame?</span>
              <h2>Expert service built for homes and businesses</h2>
            </div>
            <p>Our local delivery team keeps cylinders stocked, supports safe handling, and provides updates in real time.</p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <h3>Fast delivery</h3>
              <p>Order now and get gas delivered quickly to your doorstep with real-time tracking.</p>
            </div>
            <div className="feature-card">
              <h3>Verified quality</h3>
              <p>We provide trusted cylinders and refills with consistent quality checks.</p>
            </div>
            <div className="feature-card">
              <h3>24/7 support</h3>
              <p>Customer support is available whenever you need help placing or tracking your order.</p>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-header">
            <div>
              <span className="eyebrow">Get in touch</span>
              <h2>Ready to order or ask a question?</h2>
            </div>
            <p>Send us a message on WhatsApp and our team will reply fast.</p>
          </div>

          <div className="contact-card">
            <div>
              <h3>Contact support</h3>
              <p>Phone and WhatsApp support is available around the clock.</p>
              <button className="contact-link" onClick={() => sendWhatsAppMessage('Hello Blue Flame Gas! I would like to make an order.')}>Chat on WhatsApp</button>
            </div>
            <div className="support-stats">
              <div>
                <strong>99%</strong>
                <span>On-time deliveries</span>
              </div>
              <div>
                <strong>5K+</strong>
                <span>Happy customers</span>
              </div>
            </div>
          </div>

          <div className="contact-card" style={{ marginTop: '2rem' }}>
            <div>
              <h3>Request a Delivery</h3>
              <form onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="08012345678"
                    value={contactPhone}
                    onChange={e => setContactPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="amount">Amount (₦)</label>
                  <input
                    id="amount"
                    type="number"
                    placeholder="e.g., 5000"
                    min="1300"
                    value={contactBudget}
                    onChange={e => setContactBudget(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Delivery Address</label>
                  <textarea
                    id="address"
                    placeholder="Your full delivery address"
                    value={contactAddress}
                    onChange={e => setContactAddress(e.target.value)}
                    required
                  />
                </div>
                <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>Submit Order</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Blue Flame Gas. Built with React.</p>
      </footer>
    </div>
  );
};

export default App;
