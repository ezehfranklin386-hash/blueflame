import React from 'react';

function Alert({ type, message }) {
  const classMap = {
    success: 'alert-success',
    danger: 'alert-danger',
    warning: 'alert-warning',
    info: 'alert-info',
  };

  return (
    <div className={`alert ${classMap[type] || 'alert-info'}`}>
      {message}
    </div>
  );
}

export default Alert;
