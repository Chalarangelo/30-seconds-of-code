---
title: displacementWithAcceleration
tags: math, physics, beginner
---

Calculates the displacement with acceleration

- Displacement equals the original velocity multiplied by time plus one half the acceleration multiplied by the square of time.
- Part of a set of 4 kinematic equations which relate to displacement, velocity, time, and acceleration.
- Velocity in  m/s, acceleration in  m/s/s, time in s

```js
const displacementWAcceleration = (initial_velocity, acceleration, time) => (
(initial_velocity * time) +  (0.5*acceleration*(time**2))
);

```

```js
displacementWAcceleration(5.0, 2, 3); // 24
```
