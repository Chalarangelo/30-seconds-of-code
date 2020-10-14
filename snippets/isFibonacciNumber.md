---
title: isFibonacciNumber
tags: Math,advanced
---

Check if `n` is a number in the Fibonacci sequence.

- `n` is a Fibonacci number if either `5n^2+4` or `5n^2-4` are perfect squares.
- To check for perfect square, use `Math.sqrt` to get the square root, then divide by `1` and check if remainder is `0`.

```js
const isFibonacciNumber = n => {
	return (Math.sqrt(5*n*n + 4) % 1 === 0) || (Math.sqrt(5*n*n - 4) % 1 === 0);
}
```

```js
isFibonacciNumber('3'); // 'true'
isFibonacciNumber('4'); // 'false'
```
