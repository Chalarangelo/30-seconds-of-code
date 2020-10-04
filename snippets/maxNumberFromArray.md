---
title: maxNumberFromArray
tags: number,array,beginner
---

Return the maximum elements from an array

- Use the arrow function that takes the array and the number of elements we want the function returns.
- Use the spread operator `(...)` and the `sort` and `slice` methods

```js
const maxFromArray = (array, number = 1) => [...array].sort((x,y) => y - x).slice(0, number);
```

```js
maxFromArray([1, 2, 3, 4, 5]) // [5]
maxFromArray([7, 8, 9, 10, 10], 2) // [10, 10]
```
