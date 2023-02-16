---
title: "Tip: Use JavaScript for loops if you need to break out early"
shortTitle: For loops for early breaking
type: tip
tags: javascript,array,loop
author: chalarangelo
cover: armchair
excerpt: JavaScript provides a handful of ways to iterate over data. While array methods are usually preferred, there are cases where a `for` loop is actually the best option.
firstSeen: 2021-05-27T12:00:00+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

The usefulness of the humble `for` loop in modern JavaScript is rarely talked about. Apart from it being particularly useful in [asynchronous operation scenarios](/blog/s/javascript-async-array-loops), it can also make your code a lot more performant shall you need to break out of a loop early. Consider the following example:

```js
const smallArray = [0, 2];
const largeArray = Array.from({ length: 1000 }, (_, i) => i);

const areEqual = (a, b) => {
  let result = true;
  a.forEach((x, i) => {
    if (!result) return;
    if (b[i] === undefined || x !== b[i]) result = false;
  });
  return result;
}

areEqual(largeArray, smallArray); // false
// Will loop over all items in `largeArray`
```

Obviously, the code isn't optimized, but it highlights the issue of array methods, such as `Array.prototype.forEach()` being unable to break out of the loop early. To counteract this, we could use a `for` loop and an early `return` instead:

```js
const smallArray = [0, 2];
const largeArray = Array.from({ length: 1000 }, (_, i) => i);

const areEqual = (a, b) => {
  for (let i in a) {
    if (b[i] === undefined || a[i] !== b[i]) return false;
  }
  return true;
}

areEqual(largeArray, smallArray); // false
// Will only loop until the first mismatch is encountered
```
