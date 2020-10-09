---
title: fibonacci
tags: math,iterative,beginner
---

Generates an array, containing the Fibonacci sequence, up until the nth term.

- Create an empty array of the specific length, initializing the first two values (`0` and `1`).
- Use for loop to add values into the array, using the sum of the last two values, except for the first two.

```js
const fibonacci = num => 
    var num1=0; 
    var num2=1; 
    var sum; 
    var i=0; 
    for (i = 0; i < num; i++)  
    { 
        sum=num1+num2; 
        num1=num2; 
        num2=sum; 
    } 
    return num2; 
```

```js
fibonacci(6); // [0, 1, 1, 2, 3, 5]
```
