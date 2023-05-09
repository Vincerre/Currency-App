export const convertPLNToUSD = (PLN) => {
  const PLNtoUSD = PLN / 3.5;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  if (typeof PLN === 'string' || PLN === undefined) {
    return NaN;
  }

  if (PLN < 0) {
    return '$0.00';
  }

  if (typeof PLN !== 'string' && typeof PLN !== 'number') {
    return 'Error';
  }

  if (PLN === null) {
    return NaN;
  }

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
};
