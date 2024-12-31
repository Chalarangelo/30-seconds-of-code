---
title: Convert the output of a JavaScript generator to an array
shortTitle: Generator to array
language: javascript
tags: [function,array,generator]
cover: messy-papers
excerpt: Converts the output of any generator function to an array using the spread operator.
listed: true
dateModified: 2024-08-01
---

When working with `Set` and `Map` objects, I came across an implementation detail that got a little annoying a little too fast. The `entries()` method of these objects returns a **generator object**, which is not directly usable as an array. But, more often than not, I needed the output as an array. Let's see how we can deal with this.

As mentioned in [the range generator article](/js/s/range-generator), generators are [`Iterator` objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator) under the hood. This means that we can use the spread operator (`...`) to convert the output of a generator function to an array.

This means we can convert the output of any generator function to an array by **simply spreading** it. Here's a simple function that does just that:

```js
const generatorToArray = gen => [...gen];

const s = new Set([1, 2, 1, 3, 1, 4]);
generatorToArray(s.entries());
// [[ 1, 1 ], [ 2, 2 ], [ 3, 3 ], [ 4, 4 ]]
```
