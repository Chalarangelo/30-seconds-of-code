---
title: Add ordinal suffix to a number in JavaScript
shortTitle: Ordinal suffix
type: tip
language: javascript
tags: [math]
cover: tram-car-2
excerpt: Leverage `Intl.PluralRules` to add the correct ordinal suffix to a number in JavaScript.
dateModified: 2024-02-14
---

In the past, converting a number to its **ordinal form** (e.g. `1` to `1st`, `2` to `2nd`, `3` to `3rd`, etc.) required a lot of manual work. You had to write a function that checked the last digit of the number and then added the correct suffix.

With the introduction of the `Intl.PluralRules` object in JavaScript, this process has become much easier. All you have to do is **specify the correct locale** and add the `type: 'ordinal'` option to the `select` method, when calling constructing the object.

Then, using `Intl.PluralRules.prototype.select()`, you can pass the number to the method to get the correct **pluralization category** for the number. This will return the correct suffix for the number, using a **lookup dictionary** based on the locale.

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
