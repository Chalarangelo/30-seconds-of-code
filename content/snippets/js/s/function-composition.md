---
title: Function composition in JavaScript
shortTitle: Function composition
language: javascript
tags: [function]
cover: digital-nomad-16
excerpt: Understand the basics of function composition, a fundamental concept in functional programming.
listed: true
dateModified: 2023-12-29
journeyId: js/functional-programming
---

In functional programming, **function composition** is the process of combining multiple functions to produce a new function. This technique is used heavily in functional programming, but it can also be used in imperative programming. Its main benefits are **readability**, **reusability** and **modularity**.

## Compose functions

Creating a `compose()` function is relatively simple, as long as we understand how it should work. Similar to math, function composition in JavaScript is performed **from right to left**. In order to iterate over the functions we can simply use `Array.prototype.reduce()` and pass the result of the previous function as the argument to the next function. The first function can have **any arity** (number of arguments), while the remaining functions must be **unary** (only one argument).

```js
const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)));

const digitize = n => [...`${n}`].map(i => parseInt(i));
const add5 = x => x + 5;
const multiply = (x, y) => x * y;

const composedFn = compose(
  digitize,
  add5,
  multiply
);
composedFn(5, 2); // [1, 5]
```

## Pipe functions

If right-to-left function composition sounds counterintuitive to you, you can easily create a `pipe()` function that performs **left-to-right** function composition. The implementation is almost identical to the previous one, except that we need to **reverse the order** the functions are called in.

```js
const pipe = (...fns) =>
  fns.reduce((f, g) => (...args) => g(f(...args)));

const digitize = n => [...`${n}`].map(i => parseInt(i));
const add5 = x => x + 5;
const multiply = (x, y) => x * y;

const composedFn = pipe(multiply, add5, digitize);
composedFn(5, 2); // [1, 5]
```
