---
title: truncateStringAtWhitespace
tags: string,intermediate
---

Truncates a string up to specified length, respecting whitespace when possible.

- Determine if `String.prototype.length` is greater or equal to `lim`. If not, return it as-is.
- Use `String.prototype.slice()` and `String.prototype.lastIndexOf()` to find the index of the last space below the desired `lim`.
- Use `String.prototype.slice()` to appropriately truncate `str` based on `lastSpace`, respecting whitespace if possible and appending `ending` at the end.
- Omit the third argument, `ending`, to use the default ending of `'...'`.

```js
const truncateStringAtWhitespace = (str, lim, ending = '...') => {
  if (str.length <= lim) return str;
  const lastSpace = str.slice(0, lim - ending.length + 1).lastIndexOf(' ');
  return str.slice(0, lastSpace > 0 ? lastSpace : lim - ending.length) + ending;
};
```

```js
truncateStringAtWhitespace('short', 10); // 'short'
truncateStringAtWhitespace('not so short', 10); // 'not so...'
truncateStringAtWhitespace('trying a thing', 10); // 'trying...'
truncateStringAtWhitespace('javascripting', 10); // 'javascr...'
```
