const expect = require('expect');
const toCurrency = require('./toCurrency.js');


  test('toCurrency is a Function', () => {
  expect(toCurrency).toBeInstanceOf(Function);
});
  t.equal(toCurrency(123456.789, 'EUR'), '€ 123,456.79', 'currency: Euro | currencyLangFormat: Local');
  t.equal(toCurrency(123456.789, 'USD', 'en-us'), '$123,456.79', ' currency: US Dollar | currencyLangFormat: English (United States)');
  t.equal(toCurrency(322342436423.2435, 'JPY'), 'JP¥ 322,342,436,423', 'currency: Japanese Yen | currencyLangFormat: Local');
  

