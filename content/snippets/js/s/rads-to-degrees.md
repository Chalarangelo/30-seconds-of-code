---
title: Radians to degrees
type: snippet
language: javascript
tags: [math]
cover: flower-portrait-6
dateModified: 2020-09-15
---

Converts an angle from radians to degrees.

- Use `Math.PI` and the radian to degree formula to convert the angle from radians to degrees.

```js
const radsToDegrees = rad => (rad * 180.0) / Math.PI;
```

```js
radsToDegrees(Math.PI / 2); // 90
```
