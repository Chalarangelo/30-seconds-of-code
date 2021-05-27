---
title: "Tip: Use JavaScript for loops if you need to break out early"
type: story
tags: javascript,array,loop
authors: chalarangelo
cover: blog_images/armchair.jpg
excerpt: JavaScript provides a handful of ways to iterate over data. While array methods are usually preferred, there are cases where a `for` loop is actually the best option.
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

**Image credit:** [Amin Hasani](https://unsplash.com/@aminhasani?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
