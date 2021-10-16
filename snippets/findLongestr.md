---
title: findLongestr
tags: array,string,max
---

Finds the longest element in the provided array

- Use `Array.prototype.map()` to  map an array length with its length
- Use `Math.max()` to get biggest number maxLen
- Use `Array.prototype.filter()` to find the item that it's length equals maxLen

```js
const findLongestr = array => array.find((item) => item.length === Math.max(...array.map((item) => item.length)))

```

```js
let arrayString = ["abc", 'abcd', "abcde"]

findLongestr(arrayString); // "abcde"
```
