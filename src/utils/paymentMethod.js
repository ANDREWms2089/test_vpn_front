const STORAGE_KEY = 'beznet_payment_method';

export const PAYMENT_METHODS = [
  { id: 'sbp', label: 'СБП' },
  { id: 'sber_pay', label: 'Сбер Пей' },
  { id: 'card', label: 'Картой' },
];

const VALID_IDS = PAYMENT_METHODS.map((m) => m.id);

export function getPaymentMethod() {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (raw && VALID_IDS.includes(raw)) return raw;
  } catch (_) {}
  return 'card';
}

export function setPaymentMethod(id) {
  if (!VALID_IDS.includes(id)) return;
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, id);
  } catch (_) {}
}
