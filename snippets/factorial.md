---
title: factorial
tags: math, iterative,  beginner
---

Calculates the factorial of a number.

- Use iterative approach.
- If `n` is less than or equal to `1`, return `1`.
- Otherwise, return the factorial of `n` by using for loop.
```js
const factorial = n =>
  let answer = 1;
  if (n == 0 || n == 1) {
    return answer;
  }
  else {
    for(var i = n; i >= 1; i--) {
      answer = answer * i;
    }
    return answer;
  }  
```

```js
factorial(6); // 720
```
