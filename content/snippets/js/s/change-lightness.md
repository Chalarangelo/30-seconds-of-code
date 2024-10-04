---
title: Change color lightness using JavaScript
shortTitle: Change color lightness
language: javascript
tags: [string,regexp]
cover: aerial-view-port
excerpt: Learn how to change the lightness component of an `hsl()` color string using JavaScript.
listed: true
dateModified: 2024-02-04
---

One of the most common operations I've found myself performing when working with colors is changing their lightness component. This is particularly useful when you want to create a **hover effect** for a UI element, or when you want to **animate** a color change.

In order to accomplish this, we have to first parse the `hsl()` color string and separate its components. This can be easily done using a **regular expression** and the `String.prototype.match()` method.

Once we have the components, we can modify the lightness value and create a new `hsl()` string. In order to safeguard against **invalid lightness values**, we can use `Math.max()` and `Math.min()` to ensure the value is within the valid range (between `0` and `100`).

Finally, we can use a **template literal** to create a new `hsl()` string with the updated value.

```js
const changeLightness = (delta, hslStr) => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);

  const newLightness = Math.max(
    0,
    Math.min(100, lightness + Number.parseFloat(delta))
  );

  return `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
};

changeLightness(10, 'hsl(330, 50%, 50%)'); // 'hsl(330, 50%, 60%)'
changeLightness(-10, 'hsl(330, 50%, 50%)'); // 'hsl(330, 50%, 40%)'
changeLightness(-100, 'hsl(330, 50%, 50%)'); // 'hsl(330, 50%, 0%)'
changeLightness(100, 'hsl(330, 50%, 50%)'); // 'hsl(330, 50%, 100%)'
```
