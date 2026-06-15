import React, { useState } from 'react';
import { supabase } from '../supabase';
import ConfirmModal from '../components/ConfirmModal';
import Alert from '../components/Alert';

function Settings() {
  const [newPassword, setNewPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 4000);
  };

  function updatePassword() {
    if (!newPassword || newPassword.length < 6) {
      showAlert('warning', 'Password must be at least 6 characters long');
      return;
    }
    localStorage.setItem('adminPassword', newPassword);
    showAlert('success', 'Password updated! It will persist on this browser.');
    setNewPassword('');
  }

  async function clearAllData() {
    try {
      const { error } = await supabase
        .from('sales')
        .delete()
        .neq('id', 0);

      if (error) throw error;

      showAlert('success', 'All data cleared!');
      setShowClearConfirm(false);
    } catch (error) {
      showAlert('danger', 'Error clearing data: ' + error.message);
      setShowClearConfirm(false);
    }
  }

  return (
    <div>
      <h3>Admin Settings</h3>
      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="card">
        <h4>Change Admin Password</h4>
        <div className="form-group" style={{ maxWidth: '400px' }}>
          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </div>
        <button className="btn-primary" onClick={updatePassword}>Update Password</button>
      </div>

      <div className="card">
        <h4>Danger Zone</h4>
        <p style={{ color: 'var(--gray)', marginBottom: '15px' }}>
          Click the button below to delete all sales records. This action cannot be undone.
        </p>
        <button className="btn-danger" onClick={() => setShowClearConfirm(true)}>Clear All Data</button>
      </div>

      {showClearConfirm && (
        <ConfirmModal
          title="Clear All Data"
          message="This will permanently delete ALL sales records. Type DELETE to confirm."
          confirmLabel="Clear All"
          confirmType="danger"
          requiredInput="DELETE"
          onConfirm={clearAllData}
          onCancel={() => setShowClearConfirm(false)}
        />
      )}
    </div>
  );
}

export default Settings;
