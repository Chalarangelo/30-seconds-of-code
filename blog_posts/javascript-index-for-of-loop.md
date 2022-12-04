---
title: "Tip: Get the index of an array item in a JavaScript for...of loop"
shortTitle: Array index in for...of loops
type: tip
tags: javascript,array,iterator
author: chalarangelo
cover: blog_images/cave-view.jpg
excerpt: Did you know you can get the index of an array item in a JavaScript for...of loop? Learn how with this bite-sized tip.
firstSeen: 2021-07-25T05:00:00-04:00
---

JavaScript's `for...of` loops provide an easy way to iterate over all kinds of iterables from arrays and stings to `Map` and `Set` objects. One supposed limitation over other options (e.g. `Array.prototype.forEach()`) is that you only get the value of each item in the iterable. But that is not necessarily the case, as you can easily leverage `Array.prototype.entries()` to get both the index and value of each array item:

```js
const items = ['a', 'b', 'c'];

for (let [index, item] of items.entries()) {
  console.log(`${index}: ${item}`);
}
// LOGS: 0: a, 1: b, 2: c
```

Moreover, you can use the spread operator (`...`) to convert a string into an array and then use `Array.prototype.entries()` the same way. Finally, both `Map` and `Set` prototypes provide a similar method (`Map.prototype.entries()` and `Set.prototype.entries()` respectively), which can be used the exact same way.

_If you're not familiar with `for...of` and its syntax, I highly recommending you take a look at [this article about the various iteration methods in JavaScript](/articles/s/javascript-for-in-for-of-foreach)._
