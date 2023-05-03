---
title: Format number
type: snippet
tags: [string,math]
cover: laptop-plants
dateModified: 2020-10-22T20:23:47+03:00
---

Formats a number using the local number format order.

- Use `Number.prototype.toLocaleString()` to convert a number to using the local number format separators.

```js
const formatNumber = num => num.toLocaleString();
```

```js
formatNumber(123456); // '123,456' in `en-US`
formatNumber(15675436903); // '15.675.436.903' in `de-DE`
```
