const test = require('tape');
const toCurrency = require('./toCurrency.js');

test('Testing toCurrency', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof toCurrency === 'function', 'toCurrency is a Function');
  t.equal(toCurrency(123456.789, 'EUR'), '€ 123,456.79', 'currency: Euro | currencyLangFormat: Local');
  t.equal(toCurrency(123456.789, 'USD', 'en-us'), '$123,456.79', ' currency: US Dollar | currencyLangFormat: English (United States)');
  //t.equal(toCurrency(123456.789, 'USD', 'fa'), '۱۲۳٬۴۵۶٫۷۹ ؜$', 'currency: US Dollar | currencyLangFormat: Farsi'); - These break in node
  t.equal(toCurrency(322342436423.2435, 'JPY'), 'JP¥ 322,342,436,423', 'currency: Japanese Yen | currencyLangFormat: Local');
  //t.equal(toCurrency(322342436423.2435, 'JPY', 'fi'), '322 342 436 423 ¥', 'currency: Japanese Yen | currencyLangFormat: Finnish'); - These break in node
  //t.deepEqual(toCurrency(args..), 'Expected');
  //t.equal(toCurrency(args..), 'Expected');
  //t.false(toCurrency(args..), 'Expected');
  //t.throws(toCurrency(args..), 'Expected');
  t.end();
});
