---
title: Remove accents from a JavaScript string
shortTitle: Remove accents
language: javascript
tags: [string,regexp]
cover: pink-flowers
excerpt: Learn how to remove accents from a string in JavaScript, quickly and efficiently.
listed: true
dateModified: 2024-02-07
---

Oftentimes you might need to **remove accents from a string** in JavaScript. This can be useful when you want to **compare strings** without considering accents, or when you want to **normalize strings** for storage or display.

This might seem like a difficult task, but it's actually quite simple. As a matter of fact, JavaScript's `String.prototype.normalize()` method makes it a breeze, given its [`'NFD'`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize#nfd) option. This option allows you to convert the string to a **normalized Unicode format**, which separates the base characters from the diacritical marks.

But that's not all. Having separated the base characters from the diacritical marks, you can then use `String.prototype.replace()` to **remove diacritical marks** from the string. This can be done by using a **regular expression** to match the diacritical marks in the given Unicode range (`u0300` to `u036f`) and replacing them with empty strings.

```js
const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'
```
