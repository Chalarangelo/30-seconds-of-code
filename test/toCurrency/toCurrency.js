const toCurrency = (n, curr, LanguageFormat = undefined) => new Intl.NumberFormat(LanguageFormat, { style: 'currency', currency: curr }).format(n);
module.exports = toCurrency