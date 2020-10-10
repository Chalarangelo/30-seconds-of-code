---
title: isPerfectSquare
tags: math,beginner
---

Checks whether a number is a perfect square or not.

- Check if the ```num``` is a positive number.
- Use ```Math.sqrt()``` to find square root of the ```num```.
- Use ```%``` to check whether the square root is an ```integer```.

```js
const isPerfectSquare = num => num > 0 && Math.sqrt(num) % 1 === 0;
```

```js
isPerfectSquare(25); // true
isPerfectSquare(27); // false
```
