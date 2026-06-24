import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import Alert from '../components/Alert';

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
    <div>
      <h3>Manage Gas Price</h3>
      {alert && <Alert type={alert.type} message={alert.message} />}
      <div className="card" style={{ maxWidth: '400px' }}>
        {loading ? (
          <p style={{ color: 'var(--gray)' }}>Loading current price...</p>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="admin-price">Gas Price per KG (\u20A6)</label>
              <input
                type="number"
                id="admin-price"
                placeholder="e.g., 950"
                min="100"
                step="10"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            {currentPrice && (
              <p style={{ color: 'var(--gray)', marginBottom: '15px', fontSize: '0.9rem' }}>
                Current price: \u20A6{Number(currentPrice).toLocaleString()}
              </p>
            )}
            <button className="btn-primary" onClick={handleUpdate}>Update Price</button>
            <p style={{ color: 'var(--gray)', marginTop: '15px', fontSize: '0.9rem' }}>
              This price will be used in the delivery calculator on your website.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default GasPrice;
