---
title: JavaScript function arity
shortTitle: Function arity
language: javascript
tags: [function]
cover: radio-monstera
excerpt: Function arity is a simple, yet useful concept in functional programming, especially when combined with currying.
listed: true
dateModified: 2023-12-29
journeyId: js/functional-programming
---

Function arity is the **number of arguments a function expects**. While it sounds very theoretical, it's actually quite useful in practice, especially in functional programming.

## Getting the arity of a function

The arity of a function can be easily retrieved using `Function.prototype.length`.

```js
const arity = fn => fn.length;

arity(Math.sqrt); // 1
arity(Math.pow); // 2
arity((x, y, z) => x + y + z); // 3
arity((...args) => args); // 0
```

As you can see in the example above, the arity of a function is the number of parameters it expects. This is true for **regular functions** but not for **variadic functions**. A variadic function is a function that accepts a variable number of arguments. In that case, `Function.prototype.length` will return `0`.

## Creating a function with a fixed arity

In some cases, we might want to limit the number of arguments a function can accept. This comes in handy for variadic functions, especially when combined with [currying](/js/s/curring).

### Nullary function arity

A **nullary function** is a function that accepts **no arguments**. In that case, we can simply call the function without any arguments.

```js
const nullary = fn => () => fn();

nullary(Math.random)(); // 0.6019623086
```

### Unary function arity

A **unary function** is a function that accepts **exactly one argument** and can be created by calling the function with just the first argument provided.

```js
const unary = fn => val => fn(val);

['6', '8', '10'].map(unary(Number.parseInt)); // [6, 8, 10]
```

### Binary function arity

A **binary function** is a function that accepts **exactly two arguments**. Similarly to the unary function, we can create a binary function by calling the function with just the first two arguments provided.

```js
const binary = fn => (a, b) => fn(a, b);

['2', '1', '0'].map(binary(Math.max)); // [2, 1, 2]
```

### N-ary function arity

In general, a **n-ary function** is a function that accepts **exactly `n` arguments**. Using `Array.prototype.slice()` and the spread operator (`...`), we can create a function that will call the provided function with the first `n` arguments.

```js
const nAry = (fn, n) => (...args) => fn(...args.slice(0, n));

const firstTwoMax = nAry(Math.max, 2);
[[2, 6, 'a'], [6, 4, 8], [10]].map(x => firstTwoMax(...x)); // [6, 6, 10]
```

## Converting array-accepting functions to variadic functions

In some cases, it might be easier to convert a function that accepts an array of arguments into a variadic function. Or, perhaps, we might want to do the opposite. Using the spread operator (`...`), and rest arguments, this is quite straightforward.

```js
const toVariadic = fn => (...args) => fn(args);
const fromVariadic = fn => args => fn(...args);

const allPromises = toVariadic(Promise.all.bind(Promise));
let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
allPromises(p1, p2).then(console.log); // LOGS: [1, 2]

const arrayMax = fromVariadic(Math.max);
arrayMax([1, 2, 3]); // 3
```
