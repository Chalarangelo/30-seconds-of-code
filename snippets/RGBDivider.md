---
title: RGBDivider
tags: object,beginner
---

Converts an RGB string to an object of the color letters paired with their number.

- Splits the string input so that only each of the three numbers remain in an array stored as `RGBNumbersList`
- Returns an object which pairs each number with their corresponding letter.

```js
const RGBDivider = ( RGBStr ) => {
  let RGBNumbersList = RGBStr.split('(')[1].slice(0,-1).split(',')
  return { r: Number(RGBNumbersList[0]), g: Number(RGBNumbersList[1]), b: Number(RGBNumbersList[2]) }
};
```

```js
RGBDivider('rgb(255,12,0)'); // { r: 255, g: 12, b: 0 }
```