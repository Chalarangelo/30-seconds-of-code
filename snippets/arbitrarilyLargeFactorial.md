---
title: arbitrarilyLargeFactorial
tags: math,intermediate
---

This factorial uses a `while` loop for arbitrarily large factorials to escape `RangeError`.

- Uses a `while` loop and returns `BigInt` or `null`.
- Takes an argument `num` and converts it into `BigInt`.
- If the number is less than `0n`, return `null`. If it is `1n` or `0n`, return `1n`.
- Otherwise, loop until `count` is equal to `1n`.

```js
const arbitrarilyLargeFactorial = num =>
  num < 0 ? null : num <= 1 ? 1n : (() => {
    let output = 1n; num = BigInt(num);

    while (num > 1) {
      output *= num;
      num--;
    }

    return output;
  })();
```

```js
arbitrarilyLargeFactorial(600); // 1265572316225430742541867824515082...
```
