---
title: percentToColor
tags: math,rgb,beginner
---

Converts percent into red to green color gradient.

- Input range is 0 to 100.
- Returns from range [0, 0, 0] to [255, 255, 0].

```js
const percentageRedToGreen = (percent) => {
  const r = percent<50 ? 255 : Math.floor(255-(percent*2-100)*255/100);
  const g = percent>50 ? 255 : Math.floor((percent*2)*255/100);
  return [r, g, 0];
}
```

```js
percentageRedToGreen(80); // [102, 255, 0]
percentageRedToGreen(20); // [255, 102, 0]
```
