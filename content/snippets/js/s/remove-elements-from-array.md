---
title: Remove elements from a JavaScript array without mutating it
shortTitle: Remove elements from array
type: story
language: javascript
tags: [array]
cover: chill-surfing
excerpt: Did you know that implementing a non-mutating version of `Array.prototype.splice()` is only a few lines of code?
dateModified: 2023-10-24
---

As mentioned in a [previous article](/js/s/remove-element-from-array), `Array.prototype.splice()` is often used to **remove elements from an array**. It's also capable of inserting items into an array, but it always **mutates the original array**. Oftentimes, this isn't what you really want, so let's take a look at how we can implement a non-mutating version of `Array.prototype.splice()`.

At its core, `Array.prototype.splice()` behaves as follows:

1. Items between the start of the array and the given index are kept intact.
2. Starting at the given index, the specified number of items are removed.
3. The given items, if any, are inserted after the given index.
4. The rest of the items are kept intact.

Having broken down this behavior, we can easily see that we can implement it using `Array.prototype.slice()` and `Array.prototype.concat()`.

```js
const shank = (arr, index = 0, delCount = 0, ...elements) =>
  arr
    .slice(0, index)
    .concat(elements)
    .concat(arr.slice(index + delCount));
```

```js
const names = ['alpha', 'bravo', 'charlie'];
const namesAndDelta = shank(names, 1, 0, 'delta');
// [ 'alpha', 'delta', 'bravo', 'charlie' ]
const namesNoBravo = shank(names, 1, 1); // [ 'alpha', 'charlie' ]
console.log(names); // ['alpha', 'bravo', 'charlie']
```
