---
title: Immutability in functional programming
shortTitle: Immutability
language: javascript
tags: [webdev]
cover: stars-n-snow
excerpt: Immutability is a fundamental concept you should be familiar with when learning functional programming.
listed: true
dateModified: 2023-12-14
journeyId: js/functional-programming
---

In **traditional programming**, **data is often mutable**, meaning that it can be manipulated and altered at will after it is created. Let's look at an example:

```js
let arr = [1, 2, 3];
arr.push(4); // `arr` is now [1, 2, 3, 4]
```

In **functional programming**, however, **data is treated as immutable**, meaning it cannot be changed once it is created. Instead of modifying data, new data is created based on the old data. This helps prevent unintended consequences and makes it easier to reason about the program.

```js
const arr = [1, 2, 3];
const newArr = [...arr, 4];
// `newArr` is [1, 2, 3, 4], `arr` is still [1, 2, 3]
```

As you can see in the example above, the original array is not modified. Instead, a new array is created based on the old array. The original array is still available and can be used elsewhere in the program, if needed.

> [!NOTE]
>
> In both examples, the array is technically mutable, regardless of the way it is created (using `let` or `const`). However, in the first example, the array is **mutated** via the use of `Array.prototype.push()`, while in the second example, the array is **not mutated**. This is because `Array.prototype.push()` mutates the array in-place, while the spread operator (`...`) creates a new array.
