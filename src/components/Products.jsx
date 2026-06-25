import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import { supabase } from '../supabase';
import { CONTACT_CONFIG } from '../config';

const DEFAULT_PRODUCTS = [
  { id: 'qty-3kg', name: '3kg Gas Cylinder', price: 20500, badge: 'Lightweight', hot: false, image: 'images/cylinder-3kg.png' },
  { id: 'qty-5kg', name: '5kg Gas Cylinder', price: 25500, badge: 'Popular', hot: true, image: 'images/cylinder-5kg.png' },
  { id: 'qty-6kg', name: '6kg Gas Cylinder', price: 28000, badge: null, hot: false, image: 'images/cylinder-6kg.png' },
  { id: 'qty-11kg', name: '11kg Gas Cylinder', price: 40500, badge: 'Commercial', hot: false, image: 'images/cylinder-11kg.png' },
  { id: 'qty-12kg', name: '12.5kg Gas Cylinder', price: 50000, badge: 'Best Value', hot: true, image: 'images/cylinder-12.5kg.png' }
];

function Products() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(!!supabase);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const mapped = data.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.image_url,
            badge: null,
            hot: false,
          }));
          setProducts(mapped);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const initial = {};
    products.forEach(p => { initial[p.id] = 1; });
    setQuantities(initial);
  }, [products]);

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

    window.open(`https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="products" className="products">
      <h2 style={{ color: 'var(--primary)' }} className="section-title">Our Products</h2>
      <p className="section-subtitle">Quality-certified cylinders & accessories</p>

      <div className="products-grid">
        {loading ? Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="product-card skeleton-card">
            <div className="product-image skeleton-pulse" />
            <div className="product-info">
              <div className="skeleton-line skeleton-line-title" />
              <div className="skeleton-line skeleton-line-price" />
              <div className="skeleton-line skeleton-line-btn" />
            </div>
          </div>
        )) : products.map((product, idx) => (
          <motion.div
            key={idx}
            className="product-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
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
                <Smartphone size={18} style={{verticalAlign: 'middle'}} /> Order on WhatsApp
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Products;
