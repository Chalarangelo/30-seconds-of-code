---
title: clorujeSum
tags: math,function,intermediate
---

Returns the sum of two or more numbers.

- Uses lexical closure technique to store function definitions.
- Uses recursion to call that definitions, calculating the result incrementally.

```js
const sum = a => b => b == undefined ? a : sum(a+b);
```

```js
sum(5)(3)(2)(); // 10
```

```js
let mySum = sum(1)(1);
mySum(); // 2
// ... your logic
mySum(3)(5)(); // 10
```
