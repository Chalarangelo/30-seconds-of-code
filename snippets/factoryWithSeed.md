---
title: factoryWithSeed
tags: array,beginner
---

Generates the given amount of objects based on the given factory, which receives a unique seed.

- Creates a new array of size `amount`.
- Fills it with some value to be able to iterate over it via `map`.
- Uses `map`'s second argument, the index, as a seed for the factory.

```js
const factoryWithSeed = (amount, factory) =>
  Array(amount) // create array with so many empty slots
   .fill(0) // fill them to be able to iterate
   .map((_, i) => factory(i)) // use index as seed
```

```js
const mockData = factoryWithSeed(5000, seed => ({ id: seed, name: randomAlphaNumeric(10) }));
// 5000 items with unique IDs
```
