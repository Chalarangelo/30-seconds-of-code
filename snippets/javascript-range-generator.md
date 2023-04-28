---
title: Using JavaScript generator functions for ranges
shortTitle: Generator functions for ranges
type: story
tags: [javascript,function,array]
author: chalarangelo
cover: generator
excerpt: Learn how to use JavaScript ES6 generators and iterators to iterate over ranges of numbers.
dateModified: 2021-06-12T19:30:41+03:00
---

### Generator functions

[JavaScript ES6 generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) allow you to define functions that can be exited and later re-entered, while retaining their context (variable bindings). They are defined using `function*` (`function` keyword followed by an asterisk) and use `yield` expressions to return their result. For example:

```js
function* generateRange(end, start = 0, step = 1) {
  let x = start - step;
  while(x < end - step) yield x += step;
}

const gen5 = generateRange(5);
let x = gen5.next();

while (!x.done) {
  console.log(x.value);
  x = gen5.next();
} // Logs: 0, 1, 2, 3, 4
```

In the above example, we define a generator function, `generateRange`, which will return each value between `start` and `end`, incrementing by `step` each time. We use the [generator object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) to call `Generator.prototype.next()` until it returns `{value: undefined, done: true}` to iterate over the values the generator produces.

### Symbol.iterator

[`Symbol.iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) specifies the default iterator for an object. Oftentimes, `Symbol.iterator` is implemented using a generator function. For example:

```js
const iterableXx = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
  }
};

console.log([...iterableX]); // [1, 2]
```

As you can see in this example, the object is made iterable by assigning a generator function to its `Symbol.iterator` property. This can come especially handy, if you want to iterate over some arbitrary data or create an object that is iterable and uses a generator function under the hood.

### Putting it all together

Knowing how both concepts work, we can combine them to create a range generator, similar to Python or Ruby's ranges:

```js
const range = (end, start = 0, step = 1) => {
  function* generateRange() {
    let x = start - step;
    while(x < end - step) yield x += step;
  }
  return {
    [Symbol.iterator]: generateRange
  };
}

console.log([...range(7)]); // [0, 1, 2, 3, 4, 5, 6]
for (let i of range(8, 2, 2)) console.log(i); // Logs: 2, 4, 6
```
