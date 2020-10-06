---
title: selectRandomItemFromArray
tags: math,random,floor,array,intermediate
---

Return an Random Item/Element from an Array.

- Use `Math.random()` function to get the random number between(0-1, 1 exclusive).
- Multiply it by the array length to get the numbers between(0-arrayLength).
- Use `Math.floor()` to get the index ranging from(0 to arrayLength-1).

```js
const randomItem=()=> return myArray[Math.floor(Math.random()*myArray.length)];

```

```js
let myArray = [
  "Apples",
  "Bananas",
  "Pears",
  "Guava"
];

randomItem(); // "Pears"
```
