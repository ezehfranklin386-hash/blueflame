const phoneRegex = /^(?:0|234)\d{10}$/;

export const validateName = (name) => {
  if (!name || !name.trim()) {
    return 'Please enter your full name.';
  }
  return '';
};

export const validatePhone = (phone) => {
  if (!phoneRegex.test(phone.trim())) {
    return 'Enter a valid Nigerian phone number, e.g. 08101234567 or 2348101234567.';
  }
  return '';
};

export const validateAmount = (amount, minAmount) => {
  const amountValue = Number(amount);
  if (!amount || Number.isNaN(amountValue) || amountValue < minAmount) {
    return `Amount must be at least ₦${minAmount.toLocaleString()}.`;
  }
  return '';
};

export const validateAddress = (address) => {
  if (!address || !address.trim()) {
    return 'Please enter your delivery address.';
  }
  return '';
};

export const validateForm = (data, minAmount) => {
  const nextErrors = {};

  const nameError = validateName(data.name);
  if (nameError) nextErrors.name = nameError;

  const phoneError = validatePhone(data.phone);
  if (phoneError) nextErrors.phone = phoneError;

  const amountError = validateAmount(data.amount, minAmount);
  if (amountError) nextErrors.amount = amountError;

  const addressError = validateAddress(data.address);
  if (addressError) nextErrors.address = addressError;

  return {
    isValid: Object.keys(nextErrors).length === 0,
    errors: nextErrors
  };
};
