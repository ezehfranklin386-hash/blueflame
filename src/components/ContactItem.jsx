import React from 'react';

function ContactItem({ icon, title, children }) {
  return (
    <div className="contact-item">
      <span className="contact-item-icon">{icon}</span>
      <div>
        <strong>{title}:</strong>
        <br />
        {children}
      </div>
    </div>
  );
}

export default ContactItem;
