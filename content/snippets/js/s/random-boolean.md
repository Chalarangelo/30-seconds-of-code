---
title: Random boolean value
type: snippet
language: javascript
tags: [math,random]
cover: malibu
dateModified: 2021-01-20
---

Generates a random boolean value.

- Use `Math.random()` to generate a random number and check if it is greater than or equal to `0.5`.

```js
const randomBoolean = () => Math.random() >= 0.5;
```

```js
randomBoolean(); // true
```
