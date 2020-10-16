---
title: checkParity
tags: array,intermediate
---

Checks the parity of an integer, or array of integers. Specifically, if the integer is even.

- A bitwise `AND` can be used as a modulo for divisors that are a power of two, by using the divisor \- 1 as the value to be `AND`ed with our input.
- Essentially `Y = X % 8` is equivalent to `Y = X & 7`
- My theory is that these bitwise operations are slightly faster than normal modulo.

&nbsp;

- An even number can be divided evenly by two. An odd number will have a remainder of 1.
- Invert the result of our modulo operation, which type casts the integer to a boolean.
- This gives us the desired behavior, essentially checking if a number is even.

&nbsp;

- If it's even, return true. If it's odd, return false.
- First we check our input, if it's not an array, perfect, return true/false.
- If it _is_ an array, we handle that by using _Array_.map on our input. (IE: input.map)
- The function we use for our array mapping is ourself, which causes it to recurse through all the nested arrays.


```js
const checkParity = (input) => (Array.isArray(input)) ? input.map(input => checkParity(input)) : !(input & 1);
```

```js
checkParity(5); // false
checkParity(2); // true

checkParity([5, 2]); // [ false, true ]
checkParity([5, 2, [2, 5]]); // [ false, true, [ true, false ] ]
```
