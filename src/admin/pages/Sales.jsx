import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import ConfirmModal from '../components/ConfirmModal';
import Alert from '../components/Alert';

function Sales({ onSaleChange }) {
  const [sales, setSales] = useState([]);
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
  }, []);

  async function loadSalesRecords() {
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
    }
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

      setSaleDate(new Date().toISOString().split('T')[0]);
      setSaleAmount('');
      setSaleDetails('');
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

  const formatCurrency = (value) => `\u20A6${Number(value).toLocaleString()}`;

  return (
    <div>
      <h3>Sales Records</h3>
      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="sale-type-filter">Type</label>
          <select id="sale-type-filter" value={filterType} onChange={e => { setFilterType(e.target.value); }}>
            <option value="">All Types</option>
            <option value="delivery">Delivery</option>
            <option value="product">Product Sold</option>
          </select>
        </div>
      </div>

      <div className="card">
        <h4>Add New Sale</h4>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="sale-date">Date</label>
            <input type="date" id="sale-date" value={saleDate} onChange={e => setSaleDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="sale-type-input">Type</label>
            <select id="sale-type-input" value={saleType} onChange={e => setSaleType(e.target.value)}>
              <option value="delivery">Delivery</option>
              <option value="product">Product Sold</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="sale-amount">Amount (\u20A6)</label>
            <input type="number" id="sale-amount" placeholder="e.g., 5000" min="0" value={saleAmount} onChange={e => setSaleAmount(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="sale-details">Details</label>
          <textarea id="sale-details" placeholder="e.g., Customer name, phone, product details" value={saleDetails} onChange={e => setSaleDetails(e.target.value)}></textarea>
        </div>
        <button className="btn-primary" onClick={recordSale}>Record Sale</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sales.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', color: 'var(--gray)' }}>No sales recorded yet</td></tr>
            ) : (
              sales.map(s => (
                <tr key={s.id}>
                  <td>{new Date(s.sale_date).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${s.sale_type === 'delivery' ? 'status-success' : 'status-pending'}`}>
                      {s.sale_type === 'delivery' ? 'Delivery' : 'Product'}
                    </span>
                  </td>
                  <td>{formatCurrency(s.amount)}</td>
                  <td>{s.details.substring(0, 30)}...</td>
                  <td>
                    <button className="btn-danger" onClick={() => handleDeleteClick(s.id)} style={{ padding: '5px 10px', fontSize: '0.8rem' }}>Delete</button>
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
