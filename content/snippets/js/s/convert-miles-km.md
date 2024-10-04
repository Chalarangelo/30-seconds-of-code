---
title: Convert between miles and kilometers in JavaScript
shortTitle: Convert between miles and kilometers
language: javascript
tags: [math]
cover: rocky-beach-2
excerpt: Easily apply the mile to kilometer and kilometer to mile formulas.
listed: false
dateModified: 2023-09-13
---

## Miles to kilometers

In order to convert from miles to kilometers, you can use the conversion formula `km = mi * 1.609344`.

```js
const milesToKm = miles => miles * 1.609344;

milesToKm(5); // ~8.04672
```

## Kilometers to miles

Conversely, the conversion formula from kilometers to miles is `mi = km * 0.621371`.

```js
const kmToMiles = km => km * 0.621371;

kmToMiles(8.1) // 5.0331051
```
