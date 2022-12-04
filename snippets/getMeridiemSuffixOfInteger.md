---
title: Get meridiem suffix of integer
tags: date
cover: blog_images/dark-leaves-4.jpg
firstSeen: 2018-01-13T17:14:48+02:00
lastUpdated: 2020-10-19T22:49:51+03:00
---

Converts an integer to a suffixed string, adding `am` or `pm` based on its value.

- Use the modulo operator (`%`) and conditional checks to transform an integer to a stringified 12-hour format with meridiem suffix.

```js
const getMeridiemSuffixOfInteger = num =>
  num === 0 || num === 24
    ? 12 + 'am'
    : num === 12
    ? 12 + 'pm'
    : num < 12
    ? (num % 12) + 'am'
    : (num % 12) + 'pm';
```

```js
getMeridiemSuffixOfInteger(0); // '12am'
getMeridiemSuffixOfInteger(11); // '11am'
getMeridiemSuffixOfInteger(13); // '1pm'
getMeridiemSuffixOfInteger(25); // '1pm'
```
