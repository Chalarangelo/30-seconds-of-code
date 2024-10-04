---
title: Calculate the factorial of a number using JavaScript
shortTitle: Factorial of number
language: javascript
tags: [math,algorithm,recursion]
cover: flower-vase
excerpt: Calculate the factorial of a number, using two different approaches.
listed: true
dateModified: 2024-08-18
---

The [factorial of a number](https://en.wikipedia.org/wiki/Factorial) `n` is the **product of all positive integers** less than or equal to `n`. In mathematics, it is denoted by `n!`. Calculating it using code can be approached in various ways, such as using **recursion** or **iteration**.

## Iterative approach

The **iterative** approach calculates the factorial of a number using a `for` **loop**, updating a `result` variable with the product of all numbers from `2` to `n`. While it's not the prettiest code you'll write, it gets the job done, it's **efficient and easy to understand**.

```js
const factorial = n => {
  if (n < 0) throw new TypeError('Negative numbers are not allowed!');
  let result = 1;
  for (let i = 2; i <= n; i++)  result *= i;
  return result;
};

factorial(6); // 720
```

> [!NOTE]
>
> You can easily tweak the code to use `Array.prototype.reduce()` instead of a `for` loop, but it's not recommended as it's **less efficient**.

## Recursive approach

The **recursive** approach is more elegant and concise, but it **can be less efficient** due to the overhead of function calls. Instead of a loop, it uses a **function that calls itself** with a smaller input until it reaches the **base case** of `n <= 1`, at which point it returns `1`.

```js
const factorial = n => {
  if (n < 0) throw new TypeError('Negative numbers are not allowed!');
  return n <= 1 ? 1 : n * factorial(n - 1);
};

factorial(6); // 720
```
