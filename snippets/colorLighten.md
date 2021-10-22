---
title: colorLighten
tags: node,string,intermediate,color
firstSeen: 2021-10-22T13:42:15.948Z
lastUpdated: 2021-10-22T13:42:15.948Z
---

Change color lightness with some specific value.

- First remove *#* from the given color.
- Then modify the hexa value with given value. 
- If given value is negative then make color darken and if color positive then make it lighter.
- `colorLighten(colorCode,lightnessValue)` need only two values.

```js
const colorLighten = (col, amt) => {
    let usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    let num = parseInt(col,16);
    let r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    let b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    let g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16); 
}
```

```js
// Lighten
let newColor = colorLighten("#F06D06", 20);

// Darken
let newColor = colorLighten("#F06D06", -20);
```
