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

      showAlert('success', 'All sales data cleared!');
      setShowClearConfirm(false);
    } catch (error) {
      showAlert('danger', 'Error clearing data: ' + error.message);
      setShowClearConfirm(false);
    }
  }

  return (
    <div className="settings-page">
      <h3>Settings</h3>
      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="card settings-card">
        <div className="settings-card-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <div className="settings-card-body">
          <h4>Change Admin Password</h4>
          <p>Update the password used to access this admin dashboard.</p>
          <div className="settings-password-form">
            <input
              type="password"
              id="new-password"
              placeholder="Enter new password (min 6 characters)"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <button className="btn-primary" onClick={updatePassword}>Update</button>
          </div>
        </div>
      </div>

      <div className="card settings-card settings-danger">
        <div className="settings-card-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <div className="settings-card-body">
          <h4>Danger Zone</h4>
          <p>Permanently delete all sales records from the database. This action cannot be undone.</p>
          <button className="btn-danger" onClick={() => setShowClearConfirm(true)}>Clear All Sales Data</button>
        </div>
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
