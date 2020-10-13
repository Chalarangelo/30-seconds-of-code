---
title: initializeArray
tags: array,intermediate
---

Returns an array initialized with your own function or values.

- Use an Array constructor to create an array with length specified in the amount property, (only sets the length but does not have any items).
- Use the spread (`...`) to create the undefined items in the array.
- Use `typeof` to tell if what is passed is a function
- Finally use the `Array.prototype.map` function to generate the return array.

```js
const initializeArray = (func, amount) => {
  const myfunction = typeof func !== 'function' ? ()=> func : func
  return [...Array(amount)].map(myfunction)
}
```

```js
const myfunction = (_,i) => ({id:i})
initializeArray(myfunction, 3) // [ { id:0 }, { id:1 }, { id:2 } ]
initializeArray(3,4) // [3, 3, 3, 3]
initializeArray('a',4) // ['a', 'a', 'a', 'a']
```
