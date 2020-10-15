---
title: convertToBase
tags: array,number,base,convert,begginer
---

Converts number to a different base.

- Method .toString() takes radix as parametar (min 2, max 36).
- By using radix you convert number to another base.

```js
const convertToBase = (number, base) => {
    return number.toString(base)
}
```

```js
convertToBase(27, 8); // "33"
convertToBase(27, 2); // "11011"
```
