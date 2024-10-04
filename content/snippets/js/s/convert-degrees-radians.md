---
title: Convert between degrees and radians in JavaScript
shortTitle: Convert between degrees and radians
language: javascript
tags: [math]
cover: blue-flower
excerpt: Easily apply the degree to radian and radian to degree formulas.
listed: true
dateModified: 2023-09-15
---

## Degrees to radians

JavaScript's `Math.PI` constant can be used to convert an angle from degrees to radians. The conversion formula is `radians = degrees * Math.PI / 180.0`.

```js
const degreesToRads = deg => (deg * Math.PI) / 180.0;

degreesToRads(90.0); // ~1.5708
```

## Radians to degrees

Conversely, the conversion formula from radians to degrees is `degrees = radians * 180.0 / Math.PI`.

```js
const radsToDegrees = rad => (rad * 180.0) / Math.PI;

radsToDegrees(Math.PI / 2); // 90
```
