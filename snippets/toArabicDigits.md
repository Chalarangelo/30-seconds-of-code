---
title: toArabicDigits
tags: string,beginner
---

Converts all English digits to Arabic/Farsi digits.

- Converts the input to string if it isn't already.
- Loops through a string containing all Arabic/Farsi digits.
- Replaces every digit (0-9), with corresponding index in the string.

```js
const toArabicDigits = (input) => {
  if (typeof input !== 'string') {
    input = `${input}`;
  }
  const arabicNumerals = '۰۱۲۳۴۵۶۷۸۹';
  for (i = 0; i < arabicNumerals.length; i++) {
    input = input.replace(new RegExp(i, 'g'), arabicNumerals.charAt(i));
  }
  return input;
};
```

```js
toArabicDigits(1234567890); // '۰۱۲۳۴۵۶۷۸۹'
toArabicDigits('1234567890'); // '۰۱۲۳۴۵۶۷۸۹'
toArabicDigits('abc123'); // 'abc۱۲۳'
```
