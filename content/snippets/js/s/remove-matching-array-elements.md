---
title: Remove matching elements from a JavaScript array
shortTitle: Remove matching elements from array
language: javascript
tags: [array]
cover: highlands
excerpt: Given a predicate function, remove elements from an array that match the given condition.
listed: true
dateModified: 2024-03-23
---

`Array.prototype.filter()` is the de facto way of filtering array elements based on a condition. But, what if you wanted to **remove array elements that match a condition**, instead of keeping them? Here are two ways you can do it.

## Inverting the condition

The simplest way to remove elements from an array that match a condition is to **invert the condition**. For example, if you want to remove all even numbers from an array, you can filter out all odd numbers instead.

In order to do so, you can simply **negate** the predicate function and use `Array.prototype.filter()` as usual.

```js
const negate = fn => (...args) => !fn(...args);
const remove = (arr, fn) => arr.filter(negate(fn));

const nums = [1, 2, 3, 4];
const isEven = n => n % 2 === 0;
remove(nums, isEven); // [1, 3]
nums; // [1, 2, 3, 4]
```

## Mutating the array

While mutating the array is often undesirable, it's worth mentioning that there's a way to mutate the array directly by using `Array.prototype.reduce()`. All you have to do is **find the matching elements** using `Array.prototype.filter()` and then remove them using `Array.prototype.splice()`.

An interesting side effect of this approach is that it **returns the removed elements**, which can be useful in some cases. You might think of this as a conditional `Array.prototype.splice()`.

```js
const spliceFilter = (arr, fn) =>
  arr.filter(fn).reduce((acc, val) => {
    arr.splice(arr.indexOf(val), 1);
    return acc.concat(val);
  }, []);

const nums = [1, 2, 3, 4];
const isEven = n => n % 2 === 0;
spliceFilter(nums, isEven); // [2, 4]
nums; // [1, 3]
```

> [!NOTE]
>
> Apart from mutating the original array, this approach is **significantly less performant** and should be avoided in most cases. It's included here mainly for educational purposes.
