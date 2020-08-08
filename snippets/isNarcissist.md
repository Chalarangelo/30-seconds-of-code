---
title: isNarcissist
tags: math,intermediate
---

Checks if the given number is **Narcissistic** or not

**Narcissistic Number** -
A number that is the sum of its own digits each raised to the power of the number of digits

example:- 
153 = 1^3 + 5^3 + 3^3

```js
const isNarcissist = num => {
  const arr = num.toString().split('')
  const digits = arr.length

  const sum = arr.reduce((prev, current) => {
    prev += Math.pow(+current, digits)
    return prev
  }, 0)

  if (sum === num) {
    return true
  }
  return false
}
```

```js
isNarcissist(153); // true
```
