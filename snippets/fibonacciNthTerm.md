---
title: fibonacciNthTerm
tags: math,iteration
---

Returns the Nth term of the Fibonacci sequence, using the iterative method.

- Returns 1 for N <= 2
- Compute and return the Nth term of the Fibonacci sequence.
- As a reminder: `fibonacciNthTerm(0) = 0` and `fibonacciNthTerm(1) = 1`
- For N >= 2: `fibonacciNthTerm(N) = fibonacciNthTerm(N-1) + fibonacciNthTerm(N-2)`

```js
const fibonacciNthTerm = (N) => {
  if (N <= 2) return 1;

  let a = 1, b = 1;
  for(let i = 3; i <= N; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}
```

```js
fibonacciNthTerm(20); // 6765
```
