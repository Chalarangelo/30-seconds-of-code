---
title: An introduction to functional programming
shortTitle: Functional programming introduction
language: javascript
tags: [function]
cover: driftwood
excerpt: A short introduction to the functional programming paradigm.
listed: true
dateModified: 2023-12-30
journeyId: js/functional-programming
---

Functional programming is a **programming paradigm** that treats computation as the evaluation of mathematical functions and avoids changing state and mutable data. It emphasizes the application of **functions**, in contrast to the imperative programming style, which emphasizes changes in state.

## Core concepts of functional programming

Functional programming is based on a few core concepts that are used to solve problems in a functional way. Some of these concepts are explained below, but I **strongly encourage you to read the linked articles** for a more in-depth explanation.

### Pure functions

A [pure function](/js/s/pure-functions) is a function that **always returns the same output for the same input** and has **no side effects**. This means that a pure function will not modify any external state or data. Pure functions are the **building blocks** of functional programming.

```js
// Pure function
const concat = (arr, val) => [...arr, val];

// Impure function
const push = (arr, val) => arr.push(val);
```

### Immutability

[Immutability](/js/s/immutability) means that once a value is created, it **cannot be changed**. This is in contrast to mutable data, which can be changed after it's created. Immutability is a core concept in functional programming and is closely related to pure functions.

```js
// Mutable data
let arr = [1, 2, 3];
arr.push(4); // `arr` is now [1, 2, 3, 4]

// Immutable data
const otherArr = [1, 2, 3];
const newArr = [...otherArr, 4];
// `newArr` is [1, 2, 3, 4], `otherArr` is still [1, 2, 3]
```

### Higher-order functions

A [higher-order function](/js/s/higher-order-functions) is a function that either takes a **function as an argument** or **returns a function**. Higher-order functions are very common in functional programming and are used to create more complex functions.

```js
const isEven = num => num % 2 === 0;

// Higher-order function
const inverse = fn => (...args) => !fn(...args);
const isOdd = inverse(isEven);
```

### Recursion

[Recursion](/js/s/recursion) is a technique where **a function calls itself**. It's a very powerful technique that can be used to solve many problems in functional programming.

```js
// Recursive function
const factorial = num => {
  if (num === 0) return 1;
  return num * factorial(num - 1);
};
```

## Benefits of functional programming

Functional programming has many benefits. The main one that people often talk about is that it's **easier to reason about code** written in a functional style. This is because pure functions don't have any side effects and immutable data can't be changed after it's created. This makes it **easier to test and debug** code.

Additionally, functional programming produces **reusable code** that can be **easily composed** into larger programs. This means that functions can be combined and used in different contexts, making it easier to build complex programs from a handful of smaller, simpler building blocks.
