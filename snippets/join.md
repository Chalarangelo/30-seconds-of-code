---
title: join
tags: array,intermediate
---

Joins all elements of an array into a string and returns this string.
Uses a separator and an end separator.

- Use `Array.prototype.reduce()` to combine elements into a string.
- Omit the second argument, `separator`, to use a default separator of `','`.
- Omit the third argument, `end`, to use the same value as `separator` by default.

```js

const join = (arr, separator = ',', end = separator) =>
  arr.reduce(
    (acc, val, i) =>
      i === arr.length - 2
        ? acc + val + end
        : i === arr.length - 1
          ? acc + val
          : acc + val + separator,
    ''
  );
```

```js
join(['pen', 'pineapple', 'apple', 'pen'], ',', '&'); // 'pen,pineapple,apple&pen'
join(['pen', 'pineapple', 'apple', 'pen'], ','); // 'pen,pineapple,apple,pen'
join(['pen', 'pineapple', 'apple', 'pen']); // 'pen,pineapple,apple,pen'
```
