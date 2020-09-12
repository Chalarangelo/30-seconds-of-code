---
title: RGBToHSV
tags: math, ternary operator, intermediate
---

Converts the values of RGB color components to HSV components.

Convert given RGB parameters into HSV ones and returns it in array format. 
```js
const RGBToHSV = (r, g, b) => ( [(Math.max(r/255.0 ,g/255.0, b/255.0)===Math.min(r/255.0 ,g/255.0, b/255.0))?0:((Math.max(r/255.0 ,g/255.0, b/255.0)===r/255.0)?((60*((g/255.0-b/255.0)/(Math.max(r/255.0 ,g/255.0, b/255.0)-Math.min(r/255.0 ,g/255.0, b/255.0)))+360)%360):((Math.max(r/255.0 ,g/255.0, b/255.0)===g/255.0)?((60*((b/255.0-r/255.0)/(Math.max(r/255.0 ,g/255.0, b/255.0)-Math.min(r/255.0 ,g/255.0, b/255.0)))+120)%360):((Math.max(r/255.0 ,g/255.0, b/255.0)===b/255.0)?((60*((r/255.0-g/255.0)/(Math.max(r/255.0 ,g/255.0, b/255.0)-Math.min(r/255.0 ,g/255.0, b/255.0)))+240)%360):(-1)))), (Math.max(r/255.0 ,g/255.0, b/255.0)===0)?0:(100*((Math.max(r/255.0 ,g/255.0, b/255.0)-Math.min(r/255.0 ,g/255.0, b/255.0))/Math.max(r/255.0 ,g/255.0, b/255.0))), 100*Math.max(r/255.0 ,g/255.0, b/255.0)]);
```

```js
RGBToHSV(252, 111, 48); // [18.529411764705856, 80.95238095238095, 98.82352941176471]
```
