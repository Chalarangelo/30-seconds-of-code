---
title: Number to decimal mark
tags: math
expertise: beginner
cover: blog_images/blue-bench.jpg
firstSeen: 2017-12-21T16:29:51+02:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Converts a number to a decimal mark formatted string.

- Use `Number.prototype.toLocaleString()` to convert the number to decimal mark format.

```js
const toDecimalMark = num => num.toLocaleString('en-US');
```

```js
toDecimalMark(12305030388.9087); // '12,305,030,388.909'
```
