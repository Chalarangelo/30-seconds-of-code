---
title: numberToArrayOfNumber
tags: array,beginner
---

Convert number to array of number.

- Use `Array.from()` to make a list of number and insert into an array.

```js
const numberToArrayOfNumber = (number) =>
	Array.from(Array(Number(number)), (_, x) => x)
```

```js
numberToArrayOfNumber(5) // '[0, 1, 2, 3, 4]'
```
