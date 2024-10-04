---
title: Remove the first or last n elements from a JavaScript array
shortTitle: Remove first or last n array elements
language: javascript
tags: [array]
cover: metropolitan-window
excerpt: Master JavaScript array element removal with these simple techniques.
listed: true
dateModified: 2023-12-24
---

As discussed previously, there are [multiple ways to remove an element from an array](/js/s/remove-element-from-array), depending on your needs. This time around, we'll take a look at how to remove elements from the beginning or end of an array.

## Mutative methods

`Array.prototype.shift()` and `Array.prototype.pop()` are the two **mutative methods** available for removing a **single element** from the beginning or end of an array, respectively. Both methods mutate the original array and **return the removed element**.

```js
const arr = ['a', 'b', 'c'];

const first = arr.shift(); // 'a'
const last = arr.pop(); // 'c'

console.log(arr); // ['b']
```

## Removing multiple elements

If you need to remove multiple elements from the beginning or end of an array, you can use `Array.prototype.splice()` or `Array.prototype.slice()`. The main difference between the two is that `Array.prototype.splice()` **mutates the original array**, while `Array.prototype.slice()` **returns a new array**.

We'll be focusing mainly on `Array.prototype.slice()`, as mutating the original array is usually not desirable.

### Remove array elements from the beginning

In order to remove `n` elements from the beginning of an array, you can use `Array.prototype.slice()` with a positive start index and no end index. This will return a new array with the first `n` elements removed.

```js
const drop = (arr, n = 1) => arr.slice(n);

drop([1, 2, 3]); // [2, 3]
drop([1, 2, 3], 2); // [3]
drop([1, 2, 3], 42); // []
```

### Remove array elements from the end

Conversely, in order to remove `n` elements from the end of an array, you can use `Array.prototype.slice()` with a start index of `0` and a negative end index. This will return a new array with the last `n` elements removed.

```js
const dropLast = (arr, n = 1) => arr.slice(0, -n);

dropLast([1, 2, 3]); // [1, 2]
dropLast([1, 2, 3], 2); // [1]
dropLast([1, 2, 3], 42); // []
```

## Removing elements based on a condition

A more advanced use-case is **removing elements from an array based on a condition**. While `Array.prototype.filter()` is designed to do just that, it falls short when you want to remove all elements encountered until the condition is met.

### Remove array elements from the beginning based on a condition

Before using `Array.prototype.slice()`, we first need to locate the first element matching the predicate function. This can be done using `Array.prototype.findIndex()`. Once we have the index, we can use `Array.prototype.slice()` to return a new array with the appropriate elements removed.

```js
const dropUntil = (arr, func) => {
  const index = arr.findIndex(func);
  return arr.slice(index >= 0 ? index : arr.length);
}

dropUntil([1, 2, 3, 4], n => n >= 3); // [3, 4]
```

### Remove array elements from the end based on a condition

Similarly, we can remove elements from the end of an array based on a condition. This time around, we'll use `Array.prototype.findLastIndex()` to locate the last element matching the predicate function. Once we have the index, we can use the same technique as before to return a new array with the appropriate elements removed.

```js
const dropLastUntil = (arr, func) => {
  const index = arr.findLastIndex(func);
  return arr.slice(0, index >= 0 ? index + 1 : arr.length);
}

dropLastUntil([1, 2, 3, 4], n => n < 3); // [1, 2]
```
