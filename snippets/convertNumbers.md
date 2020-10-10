---
title: convertNumbers
tags: numbers, strings, input, intermediate
---

Since users could always fill data with different keyboard settings we need to make sure that we don't send non-English numbers to our database. So to avoid such an inconsistency we should always translate our numbers or prevent a user from entering unwanted data. Convert numbers created for this cause to make sure every digit input is in standard format of it.

- Pass a string of non-English numbers to it and get the English equivalents.
- If you don't provide any input, it will return `undefined`.

```js
function convertNumbers(inputValue) {
  if (!inputValue) return undefined;
  return inputValue
    .replace(/[\u0660-\u0669]/g, function (number) {
      return number.charCodeAt(0) - 1632;
    })
    .replace(/[\u06F0-\u06F9]/g, function (number) {
      return number.charCodeAt(0) - 1776;
    });
}
```

```js
convertNumbers('۱۲۳۴۵۶۷۸۹۰'); // It will return 1234567890 in string format.
```
