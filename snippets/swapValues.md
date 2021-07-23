---
title: swapValues
tags: object, beginner
firstSeen: 2021-06-13T05:00:00-04:00
---

Swaps the values between two objects.


```js
const swapValues = (a,b) =>
  {
    const obj1 = b, obj2 = a;
    return [obj1, obj2];
  }
```

```js
const a = 'boy';
const b = 'girl';
swapValues(a, b); // { a: 'girl', b: 'boy }
```