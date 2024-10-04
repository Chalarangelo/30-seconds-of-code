---
title: Convert an HSL color string to a JavaScript array or object
shortTitle: HSL to array or object
language: javascript
tags: [string,regexp]
cover: number-2
excerpt: Easily convert an `hsl()` color string to an array of values or an object with the values of each color.
listed: true
dateModified: 2024-03-07
---

Converting a color string to a more usable format, such as an array of values or an object with the values of each color, allows you to more easily manipulate and work with colors in JavaScript. Here's how you can convert an `hsl()` color string to a JavaScript array or object.

> [!NOTE]
>
> Converting between other color formats and `rgb()` might be a prerequisite in many cases. This topic is covered in length in [a previous article](/js/s/rgb-hex-hsl-hsb-color-format-conversion).

## Convert an `hsl()` color string to an array

An `hsl()` color string may contain spaces, commas and percentage signs. However, using an appropriate regular expression combined with `String.prototype.match()` allows you to easily extract the numeric values from the string. Then, using `Array.prototype.map()` in combination with `Number` allows you to convert them into an array of numeric values.

```js
const toHSLArray = hslStr => hslStr.match(/\d+/g).map(Number);

toHSLArray('hsl(50, 10%, 10%)'); // [50, 10, 10]
```

## Convert an `hsl()` color string to an object

The steps for converting an `hsl()` color string to an **object with the values of each color** are almost identical to the previous approach. The only difference is you need to store the values into named variables and create an appropriate object from them, which can be done using **array destructuring**.

```js
const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }
```
