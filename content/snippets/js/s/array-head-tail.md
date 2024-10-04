---
title: Find the head and tail of an array in JavaScript
shortTitle: Head and tail of array
language: javascript
tags: [array]
cover: clay-pot-horizon
excerpt: Find the head or tail of a JavaScript array without mutating it.
listed: true
dateModified: 2023-10-08
---

A common operation in any programming language is finding the **head and tail of an array**. Simply put, the head of an array is its **first element**, while the tail is the **rest of the array**. There are a couple of ways to accomplish this in JavaScript, so let's dive right in.

## Destructuring assignment

The simplest way to get both the head and tail of an array is to simply use the [destructuring assignment](/js/s/destructuring-assignment#array-destructuring) syntax. This allows us to assign the first element of the array to a variable, while the rest of the array is assigned to another variable.

```js
const arr = [1, 2, 3];
const [head, ...tail] = arr;
// head = 1, tail = [2, 3]
```

This also works quite well with **empty arrays**, as the head will be `undefined` and the tail will be an empty array (`[]`).

```js
const arr = [];
const [head, ...tail] = arr;
// head = undefined, tail = []
```

## Individual functions

Destructuring assignment is nice, but what if you only want to get the head or the tail of an array? You could use destructuring assignment and ignore the variable you don't need, but there are other ways to do this as well.

### Head of an array

To get the head of an array, you need only access the first element of the array. This can be done using the [bracket notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors#Bracket_notation) syntax and the index `0`.

```js
const head = arr => (arr && arr.length ? arr[0] : undefined);

head([1, 2, 3]); // 1
head([]); // undefined
```

As you can see in this example, some additional handling can be added to check if the value is **array-like** (i.e. has a `length` property) and if it is not empty. This is not strictly necessary, but it might be worth adding in any case.

### Tail of an array

For the tail of an array, we need to return all elements except for the first one. `Array.prototype.slice()` is great for this, as you can specify a starting index of `1` to get all elements except for the first one.

```js
const tail = arr => (arr && arr.length > 1 ? arr.slice(1) : []);

tail([1, 2, 3]); // [2, 3]
tail([1]); // []
tail([]); // []
```

Similarly to the head of an array, we need to check if the value is array-like and if it has **more than one element**. If it does, we can use `Array.prototype.slice()` to return all elements except for the first one. Otherwise, we can simply return an empty array (`[]`).
