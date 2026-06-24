import React from 'react';
import { MessageCircle } from 'lucide-react';

function WhatsAppButton() {
  return (
    <a 
      href="https://wa.me/2348106606098?text=Hello%20Blue%20Flame%20Gas!%20I%20need%20help%20with%20an%20order." 
      className="whatsapp-float" 
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} color="white" />
    </a>
  );
}

export default WhatsAppButton;
