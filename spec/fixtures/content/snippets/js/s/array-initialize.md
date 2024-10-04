---
title: The many ways to initialize a JavaScript Array
shortTitle: Array Initialization
test: true
language: javascript
tags: [array]
cover: red-mountain-range
excerpt: Discover the inner workings of JavaScript arrays and learn about the different ways to initialize them.
listed: true
dateModified: 2023-06-18
---

Initializing arrays in JavaScript is important.

## Array() constructor

The first thing you'd reach for would probably be the `Array()` constructor.

```js
const arr = Array(3); // [ , , ] - 3 empty slots
arr.map(() => 1); // [ , , ] - map() skips empty slots
arr.map((_, i) => i); // [ , , ] - map() skips empty slots
arr[0]; // undefined - actually, it is an empty slot
```

## Array.from()

`Array.from()` is a static method that creates a new, shallow-copied Array instance from an **array-like or iterable object**.

```js
const arr = Array.from({ length: 3 }); // [undefined, undefined, undefined]
arr.map(() => 1); // [1, 1, 1]
arr.map((_, i) => i); // [0, 1, 2]
const staticArr = Array.from({ length: 3 }, () => 1); // [1, 1, 1]
const indexArr = Array.from({ length: 3 }, (_, i) => i); // [0, 1, 2]
```

## Array.prototype.fill()

While `Array.from()` is quite flexible, using a mapping function to fill it with the same value isn't particularly efficient, so use `Array.prototype.fill()`.

```js
const nullArr = new Array(3).fill(null); // [null, null, null]
const staticArr = Array.from({ length: 3 }).fill(1); // [1, 1, 1]
const indexArr = Array(3).fill(null).map((_, i) => i); // [0, 1, 2]
```

> [!NOTE]
>
> **Performance might be a concern** if this sort of operation is very common in your application, but overall none of these options are particularly slow.
