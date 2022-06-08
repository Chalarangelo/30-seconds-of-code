---
title: Map number to range
tags: math
expertise: beginner
cover: blog_images/clutter.jpg
firstSeen: 2019-02-23T12:38:16+02:00
lastUpdated: 2020-10-21T21:54:53+03:00
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
