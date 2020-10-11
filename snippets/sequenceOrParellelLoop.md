---
title: sequenceOrParellelLoop
tags: function,promises,beginner
---

Runs a loop in a sequential by using a for of and parallel by using a promise all with map function.

- Sequential means a set of instructions executed one after the other.
- Parallel means that two computations are literally running at the same time.
- Use for of, if you need to run with sequential.
- Use Promise.all([]), if you need to run with parallel.

Basic function for return promise by second (total \* second)

```js
const timeout = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve(ms), ms * 1000));
```

Sequential Way

```js
const sequentialFunc = async (arr) => {
  for (const value of arr) {
    console.log(await timeout(value));
  }
};
await sequentialFunc([1, 1, 1, 1, 1]); // use a time five seconds
```

Parallel Way

```js
const parallelFunc = async (arr) => {
  await Promise.all(
    arr.map(async (value) => {
      console.log(await timeout(value));
    })
  );
};
await parallelFunc([1, 1, 1, 1, 1]); //  use a time one seconds
```
