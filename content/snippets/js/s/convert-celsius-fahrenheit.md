---
title: Convert between Celsius and Fahrenheit in JavaScript
shortTitle: Convert between Celsius and Fahrenheit
language: javascript
tags: [math]
cover: golden-gate-bridge
excerpt: Easily apply the Celsius to Fahrenheit and Fahrenheit to Celsius formulas.
listed: false
dateModified: 2023-09-14
---

## Celsius to Fahrenheit

In order to convert from Celsius to Fahrenheit, you can use the conversion formula `F = 1.8 * C + 32`.

```js
const celsiusToFahrenheit = degrees => 1.8 * degrees + 32;

celsiusToFahrenheit(33); // 91.4
```

## Fahrenheit to Celsius

Conversely, the conversion formula from Fahrenheit to Celsius is `C = (F - 32) * 5 / 9`.

```js
const fahrenheitToCelsius = degrees => (degrees - 32) * 5 / 9;

fahrenheitToCelsius(32); // 0
```
