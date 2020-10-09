---
title: dollarsToCents
tags: string,number,math,intermediate
---

Converts US dollars to US cents

- Accepts string or number
- Strips out the $ symbol(in case string is passed)
- Multiplies and rounds

```js
function dollarsToCents (amount) {
  if (typeof amount !== 'number' && typeof amount !== 'string') {
    throw new Error('Amount must be string or number.')
  }

  return Math.round(100 * parseFloat(typeof amount === 'string' ? amount.replace(/[$,]/g, '') : amount))
}
```

```js
dollarsToCents('$4.00'); // 400
dollarsToCents(3); // 300
```
