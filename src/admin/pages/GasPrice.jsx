import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import Alert from '../components/Alert';

const QUICK_PRICES = [950, 1200, 1500, 1800, 2000, 2500];

function GasPrice({ onPriceUpdate }) {
  const [price, setPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState(null);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [priceRowId, setPriceRowId] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 4000);
  };

  useEffect(() => {
    loadCurrentPrice();
  }, []);

  async function loadCurrentPrice() {
    try {
      const { data, error } = await supabase
        .from('gas_prices')
        .select('id, price_per_kg')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setPriceRowId(data.id);
        setCurrentPrice(data.price_per_kg);
        setPrice(data.price_per_kg);
      } else {
        setCurrentPrice(null);
        setPrice('');
      }
    } catch (error) {
      console.error('Error loading price:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdate = async () => {
    const newPrice = Number(price);
    if (!price || newPrice < 100) {
      showAlert('danger', 'Please enter a valid price (minimum \u20A6100)');
      return;
    }

    try {
      if (priceRowId) {
        const { error } = await supabase
          .from('gas_prices')
          .update({ price_per_kg: newPrice, updated_by: 'admin' })
          .eq('id', priceRowId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('gas_prices')
          .insert({ price_per_kg: newPrice, updated_by: 'admin' })
          .select('id')
          .single();

        if (error) throw error;
        setPriceRowId(data.id);
      }

      showAlert('success', `Gas price updated to \u20A6${newPrice.toLocaleString()}`);
      setCurrentPrice(newPrice);
      if (onPriceUpdate) onPriceUpdate(newPrice);
    } catch (error) {
      showAlert('danger', 'Error updating price: ' + error.message);
    }
  };

  return (
    <div className="gas-price-page">
      <h3>Manage Gas Price</h3>
      {alert && <Alert type={alert.type} message={alert.message} />}
      <div className="card price-card">
        {loading ? (
          <div className="card-loading">
            <div className="spinner" />
            <p>Loading current price...</p>
          </div>
        ) : (
          <>
            <div className="price-hero">
              <span className="price-hero-label">Current Price</span>
              <div className="price-hero-value">
                \u20A6{currentPrice ? Number(currentPrice).toLocaleString() : '---'}
              </div>
              <span className="price-hero-unit">per kilogram (KG)</span>
            </div>
            <div className="price-body">
              <div className="form-group">
                <label htmlFor="admin-price">New Price (\u20A6/KG)</label>
                <input
                  type="number"
                  id="admin-price"
                  placeholder="Enter new price..."
                  min="100"
                  step="10"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
              <div className="price-quick-presets">
                <span className="presets-label">Quick select:</span>
                <div className="presets-grid">
                  {QUICK_PRICES.map(p => (
                    <button
                      key={p}
                      className={`preset-btn ${Number(price) === p ? 'selected' : ''}`}
                      onClick={() => setPrice(String(p))}
                    >
                      \u20A6{p.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
              <button className="btn-primary price-update-btn" onClick={handleUpdate}>
                Update Price
              </button>
            </div>
            <div className="price-footer">
              <p>This price will be used in the delivery calculator on your website.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GasPrice;
