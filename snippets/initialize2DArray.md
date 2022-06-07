---
title: Initialize 2D array
tags: array
expertise: intermediate
cover: blog_images/cloudy-rock-formation.jpg
firstSeen: 2017-12-19T23:38:18+02:00
lastUpdated: 2020-10-20T23:02:01+03:00
---

Initializes a 2D array of given width and height and value.

- Use `Array.from()` and `Array.prototype.map()` to generate `h` rows where each is a new array of size `w`.
- Use `Array.prototype.fill()` to initialize all items with value `val`.
- Omit the last argument, `val`, to use a default value of `null`.

```js
const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));
```

```js
initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]
```
