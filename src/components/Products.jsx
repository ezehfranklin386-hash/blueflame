import React, { useState, useEffect } from 'react';

function Products() {
  const WHATSAPP_NUMBER = '2348106606098';

  const products = [
    { id: 'qty-3kg', name: '3kg Gas Cylinder', price: 20500, badge: 'Lightweight', hot: false, image: 'images/cylinder-3kg.png' },
    { id: 'qty-5kg', name: '5kg Gas Cylinder', price: 25500, badge: 'Popular', hot: true, image: 'images/cylinder-5kg.png' },
    { id: 'qty-6kg', name: '6kg Gas Cylinder', price: 28000, badge: null, hot: false, image: 'images/cylinder-6kg.png' },
    { id: 'qty-11kg', name: '11kg Gas Cylinder', price: 40500, badge: 'Commercial', hot: false, image: 'images/cylinder-11kg.png' },
    { id: 'qty-12kg', name: '12.5kg Gas Cylinder', price: 50000, badge: 'Best Value', hot: true, image: 'images/cylinder-12.5kg.png' }
  ];

  const [quantities, setQuantities] = useState({});
  const [visibleCards, setVisibleCards] = useState(new Set());

  useEffect(() => {
    const initial = {};
    products.forEach(p => { initial[p.id] = 1; });
    setQuantities(initial);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const updateQuantity = (id, change) => {
    setQuantities(prev => {
      const newVal = Math.max(1, Math.min(10, (prev[id] || 1) + change));
      return { ...prev, [id]: newVal };
    });
  };

  const handleWhatsAppOrder = (product) => {
    const qty = quantities[product.id] || 1;
    const total = product.price * qty;

    const msg = `Hello Blue Flame Gas! 🔥
I want to order:
📦 Product: ${product.name}
🔢 Quantity: ${qty}
💰 Unit Price: ₦${product.price.toLocaleString()}
💵 Total: ₦${total.toLocaleString()}

📍 Delivery Address: 
📞 My Phone: 

Please confirm availability. Thank you!`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="products" className="products">
      <h2 style={{ color: '#0066CC' }} className="section-title">Our Products</h2>
      <p className="section-subtitle">Quality-certified cylinders & accessories</p>

      <div className="products-grid">
        {products.map((product, idx) => (
          <div key={idx} id={`product-${idx}`} className={`product-card animate-on-scroll ${visibleCards.has(`product-${idx}`) ? 'visible' : ''}`}>
            <div className="product-image">
              {product.badge && (
                <span className={`product-badge ${product.hot ? 'hot' : ''}`}>{product.badge}</span>
              )}
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <div className="product-price">₦{product.price.toLocaleString()}</div>
              <div className="quantity-selector">
                <button className="qty-btn minus" onClick={() => updateQuantity(product.id, -1)}>−</button>
                <input type="number" className="qty-input" value={quantities[product.id] || 1} readOnly />
                <button className="qty-btn plus" onClick={() => updateQuantity(product.id, 1)}>+</button>
              </div>
              <button className="btn btn-primary whatsapp-order" onClick={() => handleWhatsAppOrder(product)} style={{ width: '100%' }}>
                📱 Order on WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
