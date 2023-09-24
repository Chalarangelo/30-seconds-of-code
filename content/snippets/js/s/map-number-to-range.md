---
title: Map number to range
type: snippet
language: javascript
tags: [math]
cover: carrots
dateModified: 2020-10-21
---

Maps a number from one range to another range.

- Return `num` mapped between `outMin`-`outMax` from `inMin`-`inMax`.

```js
const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
```

```js
mapNumRange(5, 0, 10, 0, 100); // 50
```
