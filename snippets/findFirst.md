---
title: findFirst
tags: array,beginner
---

Returns the first element for which the provided function returns a truthy value.
Otherwise `undefined` is returned.

- Use `Array.prototype.find()` to return the first value that satisfies `fn`.

```js
const findFirst = (arr, fn) => arr.find(fn);
```

```js
const numbers = [1, 2, 4, 8, 16];

findFirst(numbers, x => x > 4); // 8
findFirst(numbers, x => x > 145); //undefined


const letters = ['one', 'two', 'three', 'two', 'one']

findFirst(letters, x => x === 'two'); // 'two'
findFirst(letters, x => x === 'five'); // undefined
```
