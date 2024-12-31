---
title: Check if a JavaScript array includes any or all values in another array
shortTitle: Array includes any or all values
language: javascript
tags: [array]
cover: tomatoes
excerpt: Check if any or all the elements in an array are included in another array.
listed: true
dateModified: 2024-01-13
---

As discussed previously, you can use `Array.prototype.includes()` to [check if an array includes a specific value](/js/s/array-includes-value). However, what if you want to check if an array **includes any or all values** in another array? The solution to this problem is just as simple.

## Check if an array includes any values

Given an array of `values`, we want to check if at least one of those values is included in another array, `arr`. We can do this by using `Array.prototype.some()` and `Array.prototype.includes()`. This way we can check each value in `values` against `arr` and return `true` if **at least one of them is included**.

```js
const includesAny = (arr, values) => values.some(v => arr.includes(v));

includesAny([1, 2, 3, 4], [2, 9]); // true
includesAny([1, 2, 3, 4], [8, 9]); // false
```

## Check if an array includes all values

Changing the condition to check if all `values` are included in `arr` is simply a matter of swapping `Array.prototype.some()` for `Array.prototype.every()`. The same logic as before applies, except now we want to return `true` if **all values are included**.

```js
const includesAll = (arr, values) => values.every(v => arr.includes(v));

includesAll([1, 2, 3, 4], [1, 4]); // true
includesAll([1, 2, 3, 4], [1, 5]); // false
```

> [!TIP]
>
> These code snippets might perform poorly for rather large arrays. If you're working with large arrays, you might want to consider using a `Set` for improved performance.
