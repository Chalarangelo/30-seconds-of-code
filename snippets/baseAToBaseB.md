---
title: baseAToBaseB
tags: math, beginner
firstSeen: 2021-09-09T13:07:45+0000
---

Converts a number from a base 'A' to base 'B' and returns it. If not all arguments are given, the function returns -1

```js
const baseAToBaseB = (number, baseA, baseB) => {
  if(!(number && baseA && baseB))
    return -1;
  const toDecimal = parseInt(number, baseA);
  const toBaseB = parseInt(toDecimal.toString(baseB));
  return toBaseB;
};
```

```js
baseAToBaseB(11, 2, 10);
// This will output 3
```
