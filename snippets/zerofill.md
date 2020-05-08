---
title: zerofill
tags: number format, zerofill
---

Fill the displayed value of the field with zeros up to the display width specified.

Use `String.prototype.padStart()` method pads the current string with another string (multiple times, if needed) until the resulting string reaches the given length. The padding is applied from the start of the current string.

```js
const zerofill = (number, zero_amount) => (number).toString().padStart(zero_amount, '0');
```

```js
zerofill(30, 5); // '00030'
```
