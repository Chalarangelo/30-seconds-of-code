---
title: Degrees to radians
tags: math,beginner
firstSeen: 2018-02-14T12:24:50+02:00
lastUpdated: 2020-09-15T16:28:04+03:00
---

Converts an angle from degrees to radians.

- Use `Math.PI` and the degree to radian formula to convert the angle from degrees to radians.

```js
const degreesToRads = deg => (deg * Math.PI) / 180.0;
```

```js
degreesToRads(90.0); // ~1.5708
```
