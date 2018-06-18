const expect = require('expect');
const toCurrency = require('./toCurrency.js');

test('Testing toCurrency', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof toCurrency === 'function').toBeTruthy();
  expect(toCurrency(123456.789, 'EUR')).toBe('€ 123,456.79');
  expect(toCurrency(123456.789, 'USD', 'en-us')).toBe('$123,456.79');
  //t.equal(toCurrency(123456.789, 'USD', 'fa'), '۱۲۳٬۴۵۶٫۷۹ ؜$', 'currency: US Dollar | currencyLangFormat: Farsi'); - These break in node
  expect(toCurrency(322342436423.2435, 'JPY')).toBe('JP¥ 322,342,436,423');
});
