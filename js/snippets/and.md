---
title: Logical and
type: snippet
tags: [math,logic]
unlisted: true
cover: succulent-1
dateModified: 2021-01-04T13:04:15+02:00
---

Checks if both arguments are `true`.

- Use the logical and (`&&`) operator on the two given values.

```js
const and = (a, b) => a && b;
```

```js
and(true, true); // true
and(true, false); // false
and(false, false); // false
```
