exports.validateRegistration = (data) => {
  const errors = [];
  if (!data.full_name || data.full_name.trim().length === 0) errors.push('Full name is required.');
  if (!data.email || !data.email.includes('@')) errors.push('A valid email address is required.');
  if (!data.password || data.password.length < 6) errors.push('Password must be at least 6 characters long.');
  return errors;
};

exports.validateHotelProfile = (data) => {
  const errors = [];
  if (!data.business_name) errors.push('Business name is required.');
  if (!data.contact_phone) errors.push('Contact phone number is required.');
  if (!data.address_text) errors.push('Physical address text is required.');
  if (data.latitude === undefined || data.longitude === undefined) {
    errors.push('Geographic coordinates (latitude and longitude) are required.');
  }
  return errors;
};