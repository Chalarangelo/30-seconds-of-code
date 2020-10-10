---
title: unaryPlus
tags: math,beginner
---

Attempts to convert any object into a number, returns NaN (Not a Number) if it fails.

- Uses the unary plus operator which precedes an object and attempts to convert it into a number.

```js
const unaryPlus = obj => +obj;
```

```js
unaryPlus(3)                                   // returns 3
unaryPlus('-3')                                // returns -3
unaryPlus('3.14')                              // returns 3.14
unaryPlus('3')                                 // returns 3
unaryPlus('0xFF')                              // returns 255
unaryPlus(true)                                // returns 1
unaryPlus('123e-5')                            // returns 0.00123
unaryPlus(false)                               // returns 0
unaryPlus(null)                                // returns 0
unaryPlus('Infinity')                          // returns Infinity
unaryPlus('infinity')                          // returns NaN
unaryPlus(function(val) { return val })        // returns NaN
```
