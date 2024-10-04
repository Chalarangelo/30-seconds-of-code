---
title: Numeric range generator in JavaScript
shortTitle: Range generator
language: javascript
tags: [function,array]
cover: generator
excerpt: Learn how to use JavaScript ES6 generators to create a range generator that produces a sequence of numbers.
listed: true
dateModified: 2024-07-30
---

[JavaScript ES6 generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) allow you to define **functions that can be exited and later re-entered**, while **retaining their context** (variable bindings). They are defined using `function*` (`function` keyword followed by an asterisk) and use `yield` expressions to return their result. But how can one use them to create a range generator that produces a sequence of numbers?

## A simple range generator

As the control flow of generators is tricky to grasp at first, let's start with the **simplest possible range implementation**. We'll only account for an `end` value, starting at `0` and incrementing by `1`. What we need to do to accomplish this is to use a `for` **loop** and `yield` the value of `i` at each iteration.

```js
const range = function* (end) {
  for (let i = 0; i < end; i++) yield i;
};

for (let i of range(5)) console.log(i);
// Logs: 0, 1, 2, 3, 4
```

## Consuming the generator output

Consuming the output of a generator can be done **step-by-step**, as needed, or **all at once**. Depending on our needs we have a few available options.

### Consumption as needed

We can, for example, use the [generator object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) to call `Generator.prototype.next()` until it returns `{ value: undefined, done: true }` to iterate over the values the generator produces.

```js
const gen5 = range(5);
let x = gen5.next();

while (!x.done) {
  console.log(x.value);
  x = gen5.next();
}
// Logs: 0, 1, 2, 3, 4
```

### Iterating over the output

As shown in the previous example, we can also use `for...of` to **iterate over the generator's output**. This is due to the fact that generators are iterable objects, implementing [`Symbol.iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) under the hood.

```js
for (let i of range(5)) console.log(i);
// Logs: 0, 1, 2, 3, 4
```

### Generator output as an array

Finally, we can also use the spread operator (`...`) to consume the generator's output all at once. This is especially useful when you want to [convert the generator's output into an array](/js/s/generator-to-array).

```js
console.log([...range(5)]);
// Logs: [0, 1, 2, 3, 4]
```

## Adding start and step parameters

Having implemented the most basic version of a range generator, we can now extend it to accept `start` and `step` parameters. This will allow us to define a range that starts at a specific value and increments by a specific step.

In order to match the behavior of Python's `range()` function, we need to account for the following scenarios:

1. If **only one argument** is provided, it should be treated as the `end` value, with `start` defaulting to `0` and `step` to `1`.
2. If **two arguments** are provided, they should be treated as `start` and `end`, with `step` defaulting to `1`.
3. If **three arguments** are provided, they should be treated as `start`, `end`, and `step`.

```js
const range = function* (start, end, step = 1) {
  if (end === undefined) (end = start), (start = 0);
  for (let i = start; i < end; i += step) yield i;
};

[...range(4)];        // [0, 1, 2, 3] (scenario 1)
[...range(6, 10)];    // [6, 7, 8, 9] (scenario 2)
[...range(2, 10, 2)]; // [2, 4, 6, 8] (scenario 3)
```
