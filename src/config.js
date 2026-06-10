export const CONTACT_CONFIG = {
  whatsappNumber: '2348106606098',
  pricePerKg: 1800,
  minOrderAmount: 1300,
  phone: '08106606098',
  email: 'blueflamesgassupply@gmail.com',
  addressLines: [
    'Blue Flame Gas Depot',
    'Uba Pharmacy Road, Awoyaya',
    'Ibeju-Lekki, Lagos State'
  ],
  hours: [
    'Mon-Sat: 7AM-9PM',
    'Sunday: 9AM-6PM'
  ]
};

export const FORM_CONFIG = {
  fields: {
    name: { label: 'Full Name', placeholder: 'Your name', type: 'text' },
    phone: { label: 'Phone Number', placeholder: '08012345678', type: 'tel' },
    amount: { label: 'Amount (₦)', placeholder: 'e.g., 5000', type: 'number' },
    address: { label: 'Delivery Address', placeholder: 'Your full delivery address', type: 'textarea' }
  }
};

export const APP_CONFIG = {
  companyName: 'Blue Flame Gas Supply LTD',
  logo: 'logo.png'
};
