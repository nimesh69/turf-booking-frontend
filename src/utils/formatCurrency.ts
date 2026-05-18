export const formatCurrency = (amount: number, currency = 'NPR') =>
  new Intl.NumberFormat('en-NP', { style: 'currency', currency }).format(amount);
