---
title: What is recursion and when is it useful?
shortTitle: Recursion introduction
type: question
tags: javascript,function,recursion
author: chalarangelo
cover: blog_images/curve.jpg
excerpt: Recursion is a very important programming concept all developers should be familiar with.
firstSeen: 2022-01-23T05:00:00-04:00
---

Recursion is the **repeated application of a process**. In JavaScript, recursion involves functions that call themselves repeatedly until they reach a base case. The base case breaks out of the recursion loop, thus allowing previous calls to the function to return a result. If no such case exists, the function will call itself indefinitely resulting in a stack overflow.

Recursion is used to solve problems where the solution depends on solutions to smaller instances of the same problem. A commonly-used example of a problem that can be solved recursively is the Fibonacci sequence:

```js
const fibonacci = n => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

fibonacci(6); // 8
```

The base case for this example is `n` being less than or equal to `1`, where the function returns the value of `n`. Any other value will call the `fibonacci` function twice to compute the values of `n - 1` and `n - 2`. These will in turn call the `fibonacci` function again until the base case is reached.

While the Fibonacci sequence can be solved with recursion, it can be more efficient to solve it using iteration. However, the inverse is true for a lot of other problems where identifying and indexing the sub-problems is difficult or costly.
