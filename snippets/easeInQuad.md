---
title: easeInQuad
tags: browser,javascript,transitions,animation,beginner
---

Easing function, accelerating from zero velocity

- Only considering the t value for the range `[0, 1] => [0, 1]`

```js
const easeInQuad = (t) => t * t;
```

```js
easeInQuad(0.25); // '0.0625'
```
