---
title: How can I convert between hexadecimal, RGB, HSL and HSB color formats in JavaScript?
shortTitle: Color format conversion
language: javascript
tags: [math,string]
cover: lemon-tea
excerpt: Learn how to easily convert between the various color formats, using JavaScript and a few simple formulas.
listed: true
dateModified: 2024-03-05
---

Working with colors often requires converting between different formats, such as hexadecimal, RGB, HSL and HSB. This can be useful when you need to manipulate colors in a specific format, or when you want to display them in a different way.

## Color formats

Before diving into conversion formulas, it's worth discussing the different color formats briefly:

- **Hexadecimal**: A **6-digit hexadecimal representation** of a color, with 2 digits for each of the red, green and blue components. For example, `#ff0000` represents the color red.
- **RGB**: A **comma-separated list of the red, green and blue components** of a color, each ranging from 0 to 255. For example, `rgb(255, 0, 0)` represents the color red.
- **HSL**: A **comma-separated list of the hue, saturation and lightness components** of a color, with the hue ranging from 0 to 360, and the saturation and lightness ranging from 0% to 100%. For example, `hsl(0, 100%, 50%)` represents the color red.
- **HSB**: A **comma-separated list of the hue, saturation and brightness components** of a color, with the hue ranging from 0 to 360, and the saturation and brightness ranging from 0% to 100%. For example, `hsb(0, 100%, 100%)` represents the color red.

## RGB to hexadecimal

Converting between RGB and hexadecimal color formats is a matter of **converting the red, green and blue components to their hexadecimal representation**. This can be done using `Number.prototype.toString()` combined with the `<<` (left-shift) operator to convert the RGB components to a 6-digit hexadecimal value. Finally, we can use `String.prototype.padStart()` to ensure that the hexadecimal value is 6 digits long.

```js
const rgbToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

rgbToHex(255, 165, 1); // 'ffa501'
```

## Hexadecimal to RGB

Converting the other way round, from hexadecimal to RGB, is a little more involved. In order to **isolate the color components** from the hexadecimal string, we'll have to use bitwise right-shift and mask bits with `&` (and) operator.

Additionally, we need to account for the possibility of an **alpha channel**, which would require returning an `rgba()` string instead of an `rgb()` string. Moreover, we should also handle the case where the hexadecimal value is only **3 digits long**, by converting it to a 6-digit version before extracting the components. Finally, we need to make sure to trim a possible `#` **prefix** from the hexadecimal string.

```js
const hexToRgb = hex => {
  let alpha = false,
    h = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (h.length === 3) h = [...h].map(x => x + x).join('');
  else if (h.length === 8) alpha = true;
  h = parseInt(h, 16);
  return (
    'rgb' +
    (alpha ? 'a' : '') +
    '(' +
    (h >>> (alpha ? 24 : 16)) +
    ', ' +
    ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    ', ' +
    ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    (alpha ? `, ${h & 0x000000ff}` : '') +
    ')'
  );
};

hexToRgb('#27ae60ff'); // 'rgba(39, 174, 96, 255)'
hexToRgb('27ae60'); // 'rgb(39, 174, 96)'
hexToRgb('#fff'); // 'rgb(255, 255, 255)'
```

> [!TIP]
>
> You can read more about 3-digit color codes and how to convert them to 6-digit color codes [here](/js/s/extend-hex).

## RGB to HSL

As the math behind colorspace conversions can be quite complex, delving into details of the conversion formula is beyond the scope of this article. Implementing the [RGB to HSL conversion formula](https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB) is fairly straightforward and requires only a few lines of code.

For clarity, all **input parameters** are expected to be in the range of [0, 255], while the **resulting values** are in the range of H: [0, 360], S: [0, 100], L: [0, 100].

```js
const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

rgbToHsl(45, 23, 11); // [21.17647, 60.71428, 10.98039]
```

## HSL to RGB

Similarly, converting from HSL to RGB requires implementing the [HSL to RGB conversion formula](https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB). The **input parameters** are expected to be in the range of H: [0, 360], S: [0, 100], L: [0, 100], while the range of all **output values** is [0, 255].

```js
const hslToRgb = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

hslToRgb(13, 100, 11); // [56.1, 12.155, 0]
```

## RGB to HSB

Much like HSL, HSB is another color format that can be derived from RGB. The [RGB to HSB conversion formula](https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB) is equally complex, but can be implemented in a few lines of code.

The range of all **input parameters** is [0, 255], while the range of the **resulting values** is H: [0, 360], S: [0, 100], B: [0, 100].

```js
const rgbToHsb = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b),
    n = v - Math.min(r, g, b);
  const h =
    n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
  return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
};

rgbToHsb(252, 111, 48);
// [18.529411764705856, 80.95238095238095, 98.82352941176471]
```

## HSB to RGB

Converting from HSB to RGB is equally straightforward, and requires implementing the [HSB to RGB conversion formula](https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB). The range of the **input parameters** is H: [0, 360], S: [0, 100], B: [0, 100], while the range of all **output values** is [0, 255].

```js
const hsbToRgb = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

hsbToRgb(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]
```

> [!NOTE]
>
> Converting from **hexadecimal to HSL or HSB** requires converting the hexadecimal value to RGB first, and then converting the RGB value to HSL or HSB. This also works the other way round.

## HSL to HSB

Converting from HSL to HSB is a matter of **scaling the saturation and lightness** values to match the brightness value. This can be done using [a simple formula](https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_HSV), where the saturation is multiplied by the minimum of the lightness and 1 minus the lightness, and the lightness is added to the result.

The range of all **input parameters** is H: [0, 360], S: [0, 100], L: [0, 100], while the range of all **output values** is H: [0, 360], S: [0, 100], B: [0, 100].

```js
const hslToHsb = (h, s, l) => {
  const b = l + (s / 100) * Math.min(l, 100 - l);
  s = b === 0 ? 0 : 2 * (1 - l / b) * 100;
  return [h, s, b];
};

hslToHsb(13, 100, 11); // [13, 100, 22]
```

## HSB to HSL

Converting from HSB to HSL is equally straightforward, and requires implementing the [HSB to HSL conversion formula](https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_HSL), which is the inverse of the HSL to HSB formula.

The range of the **input parameters** is H: [0, 360], S: [0, 100], B: [0, 100], while the range of all **output values** is H: [0, 360], S: [0, 100], L: [0, 100].

```js
const hsbToHsl = (h, s, b) => {
  const l = (b / 100) * (100 - s / 2);
  s = l === 0 || l === 1 ? 0 : ((b - l) / Math.min(l, 100 - l)) * 100;
  return [h, s, l];
};

hsbToHsl(13, 100, 22); // [13, 100, 11]
```
