---
title: Convert an RGB color string to a JavaScript array or object
shortTitle: RGB to array or object
language: javascript
tags: [string,regexp]
cover: greek-coffee
excerpt: Easily convert an `rgb()` color string to an array of values or an object with the values of each color.
listed: true
dateModified: 2024-03-06
---

When working with colors, you might need to convert a color string to a more usable format. This often means converting the string to an array of values or an object with the values of each color. Here's how you can convert an `rgb()` color string to a JavaScript array or object.

> [!NOTE]
>
> Converting between other color formats and `rgb()` might be a prerequisite in many cases. This topic is covered in length in [a previous article](/js/s/rgb-hex-hsl-hsb-color-format-conversion).

## Convert an `rgb()` color string to an array

In order to convert an `rgb()` color string to an **array of values**, you can use `String.prototype.match()` to get an array of 3 strings with the numeric values, and then use `Array.prototype.map()` in combination with `Number` to convert them into an array of numeric values.

```js
const toRGBArray = rgbStr => rgbStr.match(/\d+/g).map(Number);

toRGBArray('rgb(255, 12, 0)'); // [255, 12, 0]
```

## Convert an `rgb()` color string to an object

Subsequently, you can use **array destructuring** on top of the previous approach to store the values into named variables and create an appropriate object from them. This allows you to convert an `rgb()` color string to an **object with the values of each color**.

```js
const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}
```
