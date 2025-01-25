export function formatPhoneNumber(phone: string) {
  const lastTenDigits = phone.replace(/\D/g, '').slice(-10);
  return lastTenDigits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}