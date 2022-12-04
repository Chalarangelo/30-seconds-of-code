---
title: Logical and
tags: math,logic
unlisted: true
cover: blog_images/succulent-1.jpg
firstSeen: 2020-05-13T11:35:31+03:00
lastUpdated: 2021-01-04T13:04:15+02:00
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
