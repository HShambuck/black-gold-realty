/**
 * Format a price number into a currency string.
 */
export function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style:    'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a property size with unit.
 */
export function formatSize(size, unit = 'sqm') {
  return `${size.toLocaleString()} ${unit}`;
}

/**
 * Truncate a string to a max length.
 */
export function truncate(str, maxLength = 120) {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Format a date string to readable format.
 */
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  });
}

/**
 * Generate a WhatsApp link with pre-filled message.
 */
export function getWhatsAppLink(phone, message = '') {
  const cleaned = phone.replace(/\D/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encoded}`;
}

/**
 * Generate a mailto link.
 */
export function getMailtoLink(email, subject = '', body = '') {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}