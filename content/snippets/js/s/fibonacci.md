---
title: Generate the Fibonacci sequence in JavaScript
shortTitle: Fibonacci sequence
language: javascript
tags: [math,algorithm,recursion]
cover: matrix-flow
excerpt: Generate an array, containing the Fibonacci sequence, up until the nth term, using two different approaches.
listed: true
dateModified: 2024-08-17
---

The [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_sequence) is a series of numbers in which **each number is the sum of the two preceding ones**, starting with `0` and `1`. To generate the Fibonacci sequence using code, you can use either a **recursive** or an **iterative** approach.

## Iterative approach

The simplest way to calculate the Fibonacci sequence is to use an **iterative** approach. You can use a `for` loop to generate the sequence up to the nth term, using an array to store the values.

```js
const fibonacci = n => {
  let fib = [];
  for (let i = 0; i < n; i++) {
    if (i <= 1) fib.push(i);
    else fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib;
};

fibonacci(6); // [0, 1, 1, 2, 3, 5]
```

## Recursive approach

The **recursive** approach is more elegant and concise, but it **can be less efficient** due to the overhead of function calls. Instead of a loop, it uses a **function that calls itself** with a smaller input until it reaches the **base case** of either `n = 1` or `n = 2`, at which point it returns the corresponding array.

```js
const fibonacci = n => {
  if (n === 1) return [0];
  if (n === 2) return [0, 1];
  const fib = fibonacci(n - 1);
  return fib.concat(fib[fib.length - 1] + fib[fib.length - 2]);
};

fibonacci(6); // [0, 1, 1, 2, 3, 5]
```
