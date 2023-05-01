---
title: "Tip: Get the last element of a JavaScript array"
shortTitle: Last element of array
type: tip
tags: [javascript,array]
author: chalarangelo
cover: purple-laptop
excerpt: Array destructuring can be leveraged in many different ways. Here's one of them.
dateModified: 2022-08-28T05:00:00-04:00
---

If you have worked with JavaScript arrays before, you might know that they can be destructured much like objects. This is most commonly used to extract the first value of an array or the values of an array with a known length.

But destructuring can go much further, as it allows you to extract the `length` property of an array. Add this to the fact that extracted variables can be used in the destructuring assignment itself and you can put together a one-liner to extract the last element of an array.

```js
const arr = [1, 2, 3];
const { 0: first, length, [length - 1]: last } = arr;
first; // 1
last; // 3
length; // 3
```

While this technique is interesting, it has a couple of caveats. First off, you have to extract the `length` property, which creates an additional variable for it. And secondly, it doesn't have any significant performance advantages over other options, such as using `Array.prototype.slice()`.
