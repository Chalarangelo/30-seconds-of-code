---
title: litersToGallons
tags: math,beginner
---

Converts liters to gallons.

- Follows the conversion formula `gallon = liters * 3.785411784`.

```js
const litersToGallons = liters => liters * 3.785411784;
```

```js
litersToGallons(4) // 15.141647136
```

You can round the number by using the `toFixed` function.

```js
litersToGallons(4).toFixed(2) // "15.14"
```