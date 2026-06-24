import React, { useState } from 'react';
import { supabase } from '../supabase';
import ConfirmModal from '../components/ConfirmModal';
import Alert from '../components/Alert';

function Settings() {
  const [alert, setAlert] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 4000);
  };

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
