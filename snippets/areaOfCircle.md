---
title: areaOfCircle
tags: math,beginner
---

The user puts in the radius of a circle and the amount of decimal places, and the area is returned.

- The radius is put into the area formula for circles which is Area=PI*radius^2.
- The answer is rounded to the specified number of decimal places.
- The final answer is returned.

```js
const areaOfCircle = (radius, decimalPlaces) =>
  {return (Math.PI * Math.pow(radius, 2)).toFixed(decimalPlaces)}
```

```js
areaOfCircle(2, 2); // 12.57
```
