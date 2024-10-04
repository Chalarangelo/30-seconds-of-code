---
title: The many ways to initialize a JavaScript Array
shortTitle: Array Initialization
language: javascript
tags: [array]
cover: red-mountain-range
excerpt: Discover the inner workings of JavaScript arrays and learn about the different ways to initialize them.
listed: true
dateModified: 2023-06-18
---

Initializing arrays in JavaScript is a crucial task, with many techniques to choose from and performance considerations to keep in mind. While there might not be a one-size-fits-all solution, there are a few options you might want to consider.

## Array() constructor

The first thing you'd reach for would probably be the `Array()` constructor. Counterintuitively, this is probably the most problematic option to use on its own. While it works for any number of arguments to create an array with the given values, it falls short pretty much everywhere else. Most of its problems stem from **holes or "empty" values** with which the resulting array is populated and how these are handled elsewhere.

```js
const arr = Array(3); // [ , , ] - 3 empty slots
arr.map(() => 1); // [ , , ] - map() skips empty slots
arr.map((_, i) => i); // [ , , ] - map() skips empty slots
arr[0]; // undefined - actually, it is an empty slot
```

## Array.from()

`Array.from()` is a static method that creates a new, shallow-copied Array instance from an **array-like or iterable object**. It is very useful for converting array-like objects (e.g. `arguments`, `NodeList`) or iterables (e.g. `Set`, `Map`, `Generator`) into actual arrays. Apart from that, it can easily be "tricked" into creating an array of a given length by passing an object with a `length` property. This is somewhat slow, but it works well and circumvents some of the problems of the `Array()` constructor. Additionally, it allows you to pass a **mapping function** as a second argument, which is very useful for initializing arrays with values.

```js
const arr = Array.from({ length: 3 }); // [undefined, undefined, undefined]
arr.map(() => 1); // [1, 1, 1]
arr.map((_, i) => i); // [0, 1, 2]
const staticArr = Array.from({ length: 3 }, () => 1); // [1, 1, 1]
const indexArr = Array.from({ length: 3 }, (_, i) => i); // [0, 1, 2]
```

## Array.prototype.fill()

While `Array.from()` is quite flexible, using a mapping function to fill it with the same value isn't particularly efficient. `Array.prototype.fill()` comes to fill this gap by allowing you to **fill an existing array** with the same value. This can also come in handy in conjunction with the `Array()` constructor, as it allows you to fill the array with a value, instead of empty slots.

```js
const nullArr = new Array(3).fill(null); // [null, null, null]
const staticArr = Array.from({ length: 3 }).fill(1); // [1, 1, 1]
const indexArr = Array(3).fill(null).map((_, i) => i); // [0, 1, 2]
```

## Array.prototype.map()

`Array.from()` allows for a mapping function via a second argument, but a lot of people think it's hard to read. Additionally, there are a few edge cases, where having access to the array itself during mapping can be useful. `Array.prototype.map()` gives you this little bit of extra flexbility and readability if that's what you're concerned about. It's also able to do pretty much everything else you might need, but remember that it **doesn't work well with empty values**.

```js
const arr = Array(3).map(() => 1); // [ , , ] - map() skips empty slots
const staticArr = Array.from({ length: 3 }).map(() => 1); // [1, 1, 1]
const indexArr = Array.from({ length: 3 }).map((_, i) => i); // [0, 1, 2]
const fractionArr =
  Array.from({ length: 3 }).map((_, i, a) => i / a.length); // [0, 0.5, 1]
```

## A note on performance

Performance might be a concern if this sort of operation is very common in your application, but overall none of these options are particularly slow. The `Array()` constructor seems to be the fastest. That being said, if combined with `Array.prototype.fill()`, it can be the best option for initializing an array with a single value. Oddly enough, this performance advantage still holds even if you chain an `Array.prototype.map()` call afterwards to create dynamic values. Therefore, my personal recommendations are as follows:

```js
const initializeArrayWithValues = (n, val = 0) => Array(n).fill(val);
const initializeMappedArray = (n, mapFn = (_, i) => i) =>
  Array(n).fill(null).map(mapFn);

initializeArrayWithValues(4, 2); // [2, 2, 2, 2]
initializeMappedArray(4, (_, i) => i * 2); // [0, 2, 4, 6]
```

You can learn more tips and tricks related to JavaScript array initialization in [this collection](//js/array-initialization/p/1).
