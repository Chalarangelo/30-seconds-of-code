---
title: isFibonacci
tags: intermediate, fibonacci
---

Checks if the given number is a fibonacci number

- Uses the property of fibonacci number to check if the entered number is a fibonacci number 

```js
const isFibonacci = (number) =>  Math.sqrt(5*number*number + 4)-Math.floor(Math.sqrt(5*number*number + 4)) == 0 ||  Math.sqrt(5*number*number - 4)-Math.floor(Math.sqrt(5*number*number - 4)) == 0 
```

```js
isFibonacci(8) // Returns true
isFibonacci(7) // Returns false
```
