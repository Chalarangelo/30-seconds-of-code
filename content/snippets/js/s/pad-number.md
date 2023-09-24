---
title: Pad number
type: snippet
language: javascript
tags: [string,math]
cover: flower-portrait-2
dateModified: 2020-10-03
---

Pads a given number to the specified length.

- Use `String.prototype.padStart()` to pad the number to specified length, after converting it to a string.

```js
const padNumber = (n, l) => `${n}`.padStart(l, '0');
```

```js
padNumber(1234, 6); // '001234'
```
