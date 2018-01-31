const toCurrency = (n, curr, LanguageFormat = undefined) =>
Intl.NumberFormat(LanguageFormat, { style: 'currency', currency: curr }).format(n);
module.exports = toCurrency