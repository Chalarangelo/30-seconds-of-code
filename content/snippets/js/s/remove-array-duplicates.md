---
title: "Tip: Remove duplicates from a JavaScript array"
shortTitle: Remove duplicates from an array
type: tip
language: javascript
tags: [array]
author: chalarangelo
cover: architectural
excerpt: Easily remove duplicates from a JavaScript array using the built-in `Set` object.
dateModified: 2021-06-12
---

Removing duplicates from an array in JavaScript can be done in a variety of ways, such as using `Array.prototype.reduce()`, `Array.prototype.filter()` or even a simple `for` loop. But there's an easier alternative. JavaScript's built-in [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) object is described as a collection of values, where each value may occur only once. A `Set` object is also iterable, making it easily convertible to an array using the spread (`...`) operator.

```js
const nums = [1, 2, 2, 3, 1, 2, 4, 5, 4, 2, 6];

[...new Set(nums)] // [1, 2, 3, 4, 5, 6]
```

You can wrap this in a helper method, which is exactly what the [uniqueElements](/js/s/unique-elements) snippet does. For more complex cases, such as unique objects in an array based on a specific key, you might want to take a look at [uniqueElementsBy](/js/s/unique-elements-by).
