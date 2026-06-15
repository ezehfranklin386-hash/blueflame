import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

function Dashboard() {
  const [gasPrice, setGasPrice] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [deliveries, setDeliveries] = useState(0);
  const [recentSales, setRecentSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const formatCurrency = (value) => `\u20A6${Number(value).toLocaleString()}`;

  async function loadDashboard() {
    try {
      const { data: priceData } = await supabase
        .from('gas_prices')
        .select('price_per_kg')
        .eq('id', 1)
        .single();

      const { data: salesData } = await supabase
        .from('sales')
        .select('*');

      const { count: prodCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      const price = priceData?.price_per_kg || 0;
      let total = 0;
      let deliveryCount = 0;
      (salesData || []).forEach(s => {
        total += Number(s.amount);
        if (s.sale_type === 'delivery') deliveryCount++;
      });

      setGasPrice(price);
      setTotalSales(total);
      setProductCount(prodCount || 0);
      setDeliveries(deliveryCount);
      setRecentSales((salesData || []).slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p style={{ color: 'var(--gray)' }}>Loading dashboard...</p>;

  return (
    <div>
      <h3>Dashboard Overview</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Gas Price/KG</div>
          <div className="stat-value">{formatCurrency(gasPrice)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Sales</div>
          <div className="stat-value">{formatCurrency(totalSales)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Products</div>
          <div className="stat-value">{productCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Deliveries</div>
          <div className="stat-value">{deliveries}</div>
        </div>
      </div>

      <div className="card">
        <h3>Recent Sales</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.length === 0 ? (
                <tr><td colSpan="4" style={{ textAlign: 'center', color: 'var(--gray)' }}>No sales recorded yet</td></tr>
              ) : (
                recentSales.map(s => (
                  <tr key={s.id}>
                    <td>{new Date(s.sale_date).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge ${s.sale_type === 'delivery' ? 'status-success' : 'status-pending'}`}>
                        {s.sale_type === 'delivery' ? 'Delivery' : 'Product'}
                      </span>
                    </td>
                    <td>{formatCurrency(s.amount)}</td>
                    <td>{s.details.substring(0, 25)}...</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
