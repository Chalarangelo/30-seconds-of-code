### toCurrency

Take a number and return specified currency formatting.

Use `new Intl.NumberFormat` to enable country / currency sensitive formatting.

```js
const toCurrency = (n, curr, LanguageFormat = undefined) => new Intl.NumberFormat(LanguageFormat, { style: 'currency', currency: curr }).format(n);
```

```js
toCurrency(123456.789, 'EUR') // number: €123,456.79  | currency: Euro | currencyLangFormat: Local
toCurrency(123456.789, 'USD', 'en-us') // number: €123,456.79  | currency: US Dollar | currencyLangFormat: English (United States)
toCurrency(123456.789, 'USD', 'fa') // number: ۱۲۳٬۴۵۶٫۷۹ ؜$ | currency: US Dollar | currencyLangFormat: Farsi
toCurrency(322342436423.2435, 'JPY') // number: ¥322,342,436,423 | currency: Japanese Yen | currencyLangFormat: Local
toCurrency(322342436423.2435, 'JPY', 'fi') // number: 322 342 436 423 ¥ | currency: Japanese Yen | currencyLangFormat: Finnish
```
