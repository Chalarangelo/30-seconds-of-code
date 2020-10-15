---
title: toBRLFormat
tags: function, beginner
---

Returns a string with the received number formated following the BRL currency format

- Takes one number argument
- Uses `Number.prototype.toString()` to converts it to string
- Uses `String.prototype.replace()` to replaces `.` for `,` on the converted number
- Uses `String.prototype.concat()` to concatenate the brazilian currency simbol `R$` with a space at the start of the replaced string

```js
const toBRLFormat = value => {
  return "R$ ".concat(value.toString().replace('.', ','))
}
```

```js
toBRLFormat(1200.3); // 'R$ 1200,3'
toBRLFormat(0); // 'R$ 0'
```