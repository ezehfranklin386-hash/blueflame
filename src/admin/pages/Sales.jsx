import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import ConfirmModal from '../components/ConfirmModal';
import Alert from '../components/Alert';

const SALE_TYPES = [
  { value: 'delivery', label: 'Delivery', icon: '🚚' },
  { value: 'product', label: 'Product Sold', icon: '🛒' },
];

function Sales({ onSaleChange }) {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');
  const [saleDate, setSaleDate] = useState(new Date().toISOString().split('T')[0]);
  const [saleType, setSaleType] = useState('delivery');
  const [saleAmount, setSaleAmount] = useState('');
  const [saleDetails, setSaleDetails] = useState('');
  const [alert, setAlert] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 4000);
  };

  useEffect(() => {
    loadSalesRecords();
  }, [filterType]);

  async function loadSalesRecords() {
    setLoading(true);
    try {
      let query = supabase.from('sales').select('*').order('sale_date', { ascending: false });
      if (filterType) {
        query = query.eq('sale_type', filterType);
      }
      const { data, error } = await query;
      if (error) throw error;
      setSales(data || []);
    } catch (error) {
      showAlert('danger', 'Error loading sales: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  function clearSaleForm() {
    setSaleDate(new Date().toISOString().split('T')[0]);
    setSaleAmount('');
    setSaleDetails('');
  }

  async function recordSale() {
    if (!saleDate || !saleAmount || !saleDetails) {
      showAlert('warning', 'Please fill in all fields');
      return;
    }

    try {
      const { error } = await supabase
        .from('sales')
        .insert([{
          sale_date: saleDate,
          sale_type: saleType,
          amount: parseInt(saleAmount),
          details: saleDetails
        }]);

      if (error) throw error;

      clearSaleForm();
      showAlert('success', 'Sale recorded successfully!');
      await loadSalesRecords();
      if (onSaleChange) onSaleChange();
    } catch (error) {
      showAlert('danger', 'Error recording sale: ' + error.message);
    }
  }

  function handleDeleteClick(id) {
    setConfirmDelete(id);
  }

  async function confirmDeleteSale() {
    if (!confirmDelete) return;
    try {
      const { error } = await supabase
        .from('sales')
        .delete()
        .eq('id', confirmDelete);

      if (error) throw error;
      showAlert('success', 'Sale deleted!');
      setConfirmDelete(null);
      await loadSalesRecords();
      if (onSaleChange) onSaleChange();
    } catch (error) {
      showAlert('danger', 'Error deleting sale: ' + error.message);
      setConfirmDelete(null);
    }
  }

  const totalAmount = sales.reduce((sum, s) => sum + Number(s.amount), 0);
  const deliveryCount = sales.filter(s => s.sale_type === 'delivery').length;
  const productCount = sales.filter(s => s.sale_type === 'product').length;

  return (
    <div className="sales-page">
      <h3>Sales Records</h3>
      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="sales-stats">
        <div className="sales-stat">
          <span className="sales-stat-label">Total Sales</span>
          <span className="sales-stat-value">₦{totalAmount.toLocaleString()}</span>
        </div>
        <div className="sales-stat">
          <span className="sales-stat-label">Records</span>
          <span className="sales-stat-value">{sales.length}</span>
        </div>
        <div className="sales-stat">
          <span className="sales-stat-label">Deliveries</span>
          <span className="sales-stat-value">{deliveryCount}</span>
        </div>
        <div className="sales-stat">
          <span className="sales-stat-label">Products</span>
          <span className="sales-stat-value">{productCount}</span>
        </div>
      </div>

      <div className="card add-sale-card">
        <div className="add-sale-header">
          <h4>Record New Sale</h4>
        </div>
        <div className="add-sale-body">
          <div className="add-sale-fields">
            <div className="form-group">
              <label htmlFor="sale-date">Date</label>
              <input type="date" id="sale-date" value={saleDate} onChange={e => setSaleDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="sale-type-input">Type</label>
              <select id="sale-type-input" value={saleType} onChange={e => setSaleType(e.target.value)}>
                {SALE_TYPES.map(t => <option key={t.value} value={t.value}>{t.icon} {t.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="sale-amount">Amount (₦)</label>
              <input type="number" id="sale-amount" placeholder="e.g., 5000" min="0" value={saleAmount} onChange={e => setSaleAmount(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="sale-details">Details</label>
            <textarea id="sale-details" placeholder="Customer name, phone, product details..." value={saleDetails} onChange={e => setSaleDetails(e.target.value)}></textarea>
          </div>
        </div>
        <div className="add-sale-footer">
          <button className="btn-primary" onClick={recordSale}>Record Sale</button>
          {saleAmount || saleDetails ? <button className="btn-secondary" onClick={clearSaleForm}>Clear</button> : null}
        </div>
      </div>

      <div className="sales-filter">
        <label htmlFor="sale-type-filter">Filter by type:</label>
        <select id="sale-type-filter" value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="">All Sales</option>
          {SALE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Details</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="table-empty">Loading...</td></tr>
            ) : sales.length === 0 ? (
              <tr><td colSpan="5" className="table-empty">No sales recorded yet</td></tr>
            ) : (
              sales.map(s => (
                <tr key={s.id}>
                  <td className="td-date">{new Date(s.sale_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td>
                    <span className={`sale-type-badge ${s.sale_type}`}>
                      {s.sale_type === 'delivery' ? '🚚 Delivery' : '🛒 Product'}
                    </span>
                  </td>
                  <td className="td-amount">₦{Number(s.amount).toLocaleString()}</td>
                  <td className="td-details">{s.details}</td>
                  <td className="td-action">
                    <button className="btn-delete-icon" onClick={() => handleDeleteClick(s.id)} title="Delete">✕</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {confirmDelete && (
        <ConfirmModal
          title="Delete Sale"
          message="Delete this sale record?"
          confirmLabel="Delete"
          confirmType="danger"
          onConfirm={confirmDeleteSale}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}

export default Sales;
