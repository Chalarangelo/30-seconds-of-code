---
title: inchCmConvertion
tags: math, beginner
---

- Converts inches to cm when using the String 'inch' and cm to inches when
using the String 'cm'.

```js
const inchCmConvertion = (number, unitOfLength) => {
  if (unitOfLength === 'inch')
    return number * 2.54;
  if (unitOfLength === 'cm')
    return number / 2.54;
}
```

```js
inchCmConvertion(33, 'cm'); // 12.992125984251969
```
