---
title: Compact array
tags: array
cover: blog_images/basket-paper.jpg
firstSeen: 2017-12-14T08:19:15+02:00
lastUpdated: 2020-10-22T20:23:47+03:00
---

Removes falsy values from an array.

- Use `Array.prototype.filter()` to filter out falsy values (`false`, `null`, `0`, `""`, `undefined`, and `NaN`).

```js
const compact = arr => arr.filter(Boolean);
```

```js
compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]);
// [ 1, 2, 3, 'a', 's', 34 ]
```
