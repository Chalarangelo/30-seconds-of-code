---
title: Formatting numeric values in JavaScript
shortTitle: Number formatting
language: javascript
tags: [math,string,date]
cover: white-chapel
excerpt: Learn common number formatting operations, such as rounding, padding, optional decimal marks, currency, seconds, bytes, and more.
listed: true
dateModified: 2024-02-14
---

Number formatting is one of the most common presentational tasks you'll encounter coding for the web. While there are some built-in methods, it's often necessary to roll up your own solution for a specific use case. Let's explore a few common scenarios and how to handle them.

> [!NOTE]
>
> You may not be familiar with JavaScript's [numeric separators](/js/s/numeric-separator), which are used in the examples below. They're **syntactic sugar** that make large numeric values more readable.

## Fixed-point notation without trailing zeros

In **fixed-point notation**, a number is represented with a fixed number of digits after the decimal point. However, we often want to **remove trailing zeros** from the result.

In order to do so, we can use `Number.prototype.toFixed()` to convert the number to a fixed-point notation string. Then, using `Number.parseFloat()`, we can convert the fixed-point notation string to a number, removing trailing zeros. Finally, we can use a template literal to convert the number to a string.

```js
const toOptionalFixed = (num, digits) =>
  `${Number.parseFloat(num.toFixed(digits))}`;

toOptionalFixed(1, 2); // '1'
toOptionalFixed(1.001, 2); // '1'
toOptionalFixed(1.500, 2); // '1.5'
```

## Round number to given precision

Rounding a number to a **specific number of decimal places** is pretty common. We can use `Math.round()` and template literals to round the number to the specified number of digits. Omitting the second argument, `decimals`, will round to an integer.

```js
const round = (n, decimals = 0) =>
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

round(1.005, 2); // 1.01
```

> [!NOTE]
>
> This function **returns a number**, instead of a string. This is intentional, as we might want to use the rounded number in further calculations.

## Format duration

Converting a number of milliseconds to a **human-readable format** is a matter of dividing the number by the appropriate values and creating a string for each value. In the following snippet, we'll use an object that contains the appropriate values for `day`, `hour`, `minute`, `second`, and `millisecond`, but you can easily adapt it to different needs.

We can use `Object.entries()` with `Array.prototype.filter()` to keep only non-zero values. Then, we can use `Array.prototype.map()` to create the string for each value, pluralizing appropriately. Finally, we can use `Array.prototype.join()` to combine the values into a string.

```js
const formatDuration = ms => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86_400_000),
    hour: Math.floor(ms / 3_600_000) % 24,
    minute: Math.floor(ms / 60_000) % 60,
    second: Math.floor(ms / 1_000) % 60,
    millisecond: Math.floor(ms) % 1_000
  };
  return Object.entries(time)
    .filter(val => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
    .join(', ');
};

formatDuration(1_001);
// '1 second, 1 millisecond'
formatDuration(34_325_055_574);
// '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'
```

### Number of seconds to ISO format

Similarly, formatting the number of seconds to **ISO format** is also a handful of divisions away. However, we need to handle the **sign** separately.

We can use `Array.prototype.map()` in combination with `Math.floor()` and `String.prototype.padStart()` to convert each segment to a string. Finally, we can use `Array.prototype.join()` to combine the values into a string.

```js
const formatSeconds = s => {
  const [hour, minute, second, sign] =
    s > 0
      ? [s / 3_600, (s / 60) % 60, s % 60, '']
      : [-s / 3_600, (-s / 60) % 60, -s % 60, '-'];

  return (
    sign +
    [hour, minute, second]
      .map(v => `${Math.floor(v)}`.padStart(2, '0'))
      .join(':')
  );
};

formatSeconds(200); // '00:03:20'
formatSeconds(-200); // '-00:03:20'
formatSeconds(99_999); // '27:46:39'
```

## Locale-sensitive number formatting

Formatting a number to a **locale-sensitive string** is also easy using `Number.prototype.toLocaleString()`. This method allows us to format numbers using the local number format separators.

```js
const formatNumber = num => num.toLocaleString();

formatNumber(123_456); // '123,456' in `en-US`
formatNumber(15_675_436_903); // '15.675.436.903' in `de-DE`
```

### Number to decimal mark

If we want to format a number to a specific locale, we can pass the locale as the first argument to `Number.prototype.toLocaleString()`. For example, here's how to format a number to use the **decimal mark**, using the `en-US` locale.

```js
const toDecimalMark = num => num.toLocaleString('en-US');

toDecimalMark(12_305_030_388.9087); // '12,305,030,388.909'
```

### Number to currency string

When working with **currency**, it's important to use the appropriate formatting. Luckily, JavaScript's `Intl.NumberFormat` makes this easy, allowing us to format numbers as currency strings. All we have to do is specify the currency and language format, along with `style: 'currency'`.

```js
const toCurrency = (n, curr, LanguageFormat = undefined) =>
  Intl.NumberFormat(LanguageFormat, {
    style: 'currency',
    currency: curr,
  }).format(n);

toCurrency(123_456.789, 'EUR');
// €123,456.79  | currency: Euro | currencyLangFormat: Local
toCurrency(123_456.789, 'USD', 'en-us');
// $123,456.79  | currency: US Dollar | currencyLangFormat: English (USA)
toCurrency(123_456.789, 'USD', 'fa');
// ۱۲۳٬۴۵۶٫۷۹ ؜$ | currency: US Dollar | currencyLangFormat: Farsi
toCurrency(322_342_436_423.2435, 'JPY');
// ¥322,342,436,423 | currency: Japanese Yen | currencyLangFormat: Local
toCurrency(322_342_436_423.2435, 'JPY', 'fi');
// 322 342 436 423 ¥ | currency: Japanese Yen | currencyLangFormat: Finnish
```

### Number to ordinal suffix

Converting a number to its **ordinal form** (e.g. `1` to `1st`, `2` to `2nd`, `3` to `3rd`, etc.) is also fairly simple, using `Intl.PluralRules`. We can use `Intl.PluralRules.prototype.select()` to get the correct **pluralization category** for the number, and then use a **lookup dictionary** to get the correct suffix. In order for this to produce the correct result, we need to specify the correct locale and the `type: 'ordinal'` option when constructing the object.

```js
const ordinalsEnUS = {
  one: 'st',
  two: 'nd',
  few: 'rd',
  many: 'th',
  zero: 'th',
  other: 'th',
};

const toOrdinalSuffix = (num, locale = 'en-US', ordinals = ordinalsEnUS) => {
  const pluralRules = new Intl.PluralRules(locale, { type: 'ordinal' });
  return `${num}${ordinals[pluralRules.select(num)]}`;
};

toOrdinalSuffix(1); // '1st'
toOrdinalSuffix(2); // '2nd'
toOrdinalSuffix(3); // '3rd'
toOrdinalSuffix(4); // '4th'
toOrdinalSuffix(123); // '123rd'
```

## Pad number with leading zeros

Last but not least, you might need to **pad a number with leading zeros** to a specific length. We can use `String.prototype.padStart()` to pad the number to the specified length, after converting it to a string.

```js
const padNumber = (n, l) => `${n}`.padStart(l, '0');

padNumber(1_234, 6); // '001234'
```
