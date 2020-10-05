---
title: gallonsToLiters
tags: math,beginner
---

Converts gallons to liters.

- Follows the conversion formula `liters = gallons * 0.26417205236`.

```js
const gallonsToLiters = gallons => gallons * 0.26417205236;
```

```js
gallonsToLiters(4) // 1.05668820944
```

You can round the number by using the `toFixed` function.

```js
gallonsToLiters(4).toFixed(2) // "1.06"
```