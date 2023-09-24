---
title: Degrees to radians
type: snippet
language: javascript
tags: [math]
cover: blue-flower
dateModified: 2020-09-15
---

Converts an angle from degrees to radians.

- Use `Math.PI` and the degree to radian formula to convert the angle from degrees to radians.

```js
const degreesToRads = deg => (deg * Math.PI) / 180.0;
```

```js
degreesToRads(90.0); // ~1.5708
```
