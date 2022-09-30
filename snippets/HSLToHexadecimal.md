---
title: HSL to Hexadecimal
tags: math
expertise: intermediate
cover: blog_images/maple-leaf-palette.jpg
firstSeen: 2020-10-01T23:15:49+03:00
lastUpdated: 2020-10-04T11:24:27+03:00
---

Converts a HSL color tuple to Hexadecimal format.

- Use the [HSL to Hexadecimal conversion formula](https://css-tricks.com/converting-color-spaces-in-javascript/) to convert to the appropriate format.
- The range of the input parameters is H: [0, 360], S: [0, 100], L: [0, 100].
- The range of all output values is a hexadecimal string: #000000.

```js
const HSLToHexadecimal = (h, s, l) => {
  s /= 100;
    l /= 100;
    // Account for the edge case
    if(h == 360)
        h = 0;
    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0, 
      b = 0;
    
    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;
    return "#" + r + g + b;
};
```

```js
HSLToHexadecimal(150, 88, 81); // #a4f9cf
```
