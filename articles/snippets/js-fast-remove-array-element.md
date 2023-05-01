---
title: Faster element removal in unordered JavaScript arrays
shortTitle: Faster element removal in unordered arrays
type: story
tags: [javascript,array]
author: chalarangelo
cover: purple-flower-bunch
excerpt: Are you performing a lot of array operations? Maybe element removal is a performance bottleneck you can avoid.
dateModified: 2022-03-20T05:00:00-04:00
---

`Array.prototype.splice()` is the most commonly-used way to remove elements from an array. Turns out that it’s not the fastest, though. This can be an especially important factor contributing to your code’s performance, if you are performing many operations with large arrays.

There’s a pretty easy trick that you can use to speed up this operation, but the order of elements in the array must not play a role for it to work. Provided the latter is true, you can swap two elements in the array without any issues. This means you can swap any element with the last one, for example. But removing the last element is easy and fast, using `Array.prototype.pop()`, so you can use that to your advantage. For example:

```js
const arr = [3, 1, 5, 7, 9];  // Want to remove 5 (index: 2)

arr[2] = arr[arr.length -1];  // Copy last element to 3rd place
arr.pop();                    // Remove the last element
```

In this example, we want to remove an element which is in the middle of the array. We would start by performing a swap of the element we want to remove with the last one. However, we don’t need to actually swap them. All we need to do is ensure that the last element goes in the place of the one we want to remove. We can simply copy it to that position and then use `Array.prototype.pop()` to remove the last element.

On a side note, one could think shortening this to `arr[i] = arr.pop()` would make it even terser. Turns out this isn’t the case, as this shorter version will fail if we try to remove the last element in the array.
