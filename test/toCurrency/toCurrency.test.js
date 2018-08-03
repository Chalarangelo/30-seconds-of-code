const expect = require('expect');
const toCurrency = require('./toCurrency.js');

test('toCurrency is a Function', () => {
  expect(toCurrency).toBeInstanceOf(Function);
});
test('currency: Euro | currencyLangFormat: Local', () => {
  expect(toCurrency(123456.789, 'EUR')).toEqual(expect.stringMatching(/€\s*123,456.79/g));
});
test(' currency: US Dollar | currencyLangFormat: English (United States)', () => {
  expect(toCurrency(123456.789, 'USD', 'en-us')).toEqual(expect.stringMatching(/\$\s*123,456.79/g));
});
test('currency: Japanese Yen | currencyLangFormat: Local', () => {
  expect(toCurrency(322342436423.2435, 'JPY')).toEqual(
    expect.stringMatching(/J*P*¥\s*322,342,436,423/g)
  );
});
