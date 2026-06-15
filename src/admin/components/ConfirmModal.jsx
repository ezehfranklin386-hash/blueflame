import React, { useState } from 'react';

function ConfirmModal({ title, message, confirmLabel, confirmType, requiredInput, onConfirm, onCancel }) {
  const [input, setInput] = useState('');

  const handleConfirm = () => {
    if (requiredInput && input !== requiredInput) return;
    onConfirm(input);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        {requiredInput && (
          <div className="form-group">
            <label>Type <strong>"{requiredInput}"</strong> to confirm:</label>
            <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder={requiredInput} />
          </div>
        )}
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button
            className={confirmType === 'danger' ? 'btn-danger' : 'btn-primary'}
            onClick={handleConfirm}
            disabled={requiredInput && input !== requiredInput}
          >
            {confirmLabel || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
