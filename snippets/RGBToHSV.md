---
title: RGBToHSV
tags: math, ternary operator, intermediate
---

Converts the values of RGB color components to HSV components.

Convert given RGB parameters to HSV using following method:
```
Divide r, g, b by 255
Compute max, min, difference b/w max and min
Hue calculation :
if max and min equal 0, then h = 0
if max equal r then compute h = (60 * ((g – b) / diff) + 360) % 360
if max equal g then compute h = (60 * ((b – r) / diff) + 120) % 360
if max equal b then compute h = (60 * ((r – g) / diff) + 240) % 360
Saturation computation :
if max = 0, then s = 0
if max does not equal 0 then compute s = (diff/max)*100
Value computation :
v = max*100
```
```js
const RGBToHSV = (r, g, b) => ( [(Math.max(r/255.0 ,g/255.0, b/255.0)===Math.min(r/255.0 ,g/255.0, b/255.0))?0:((Math.max(r/255.0 ,g/255.0, b/255.0)===r/255.0)?((60*((g/255.0-b/255.0)/(Math.max(r/255.0 ,g/255.0, b/255.0)-Math.min(r/255.0 ,g/255.0, b/255.0)))+360)%360):((Math.max(r/255.0 ,g/255.0, b/255.0)===g/255.0)?((60*((b/255.0-r/255.0)/(Math.max(r/255.0 ,g/255.0, b/255.0)-Math.min(r/255.0 ,g/255.0, b/255.0)))+120)%360):((Math.max(r/255.0 ,g/255.0, b/255.0)===b/255.0)?((60*((r/255.0-g/255.0)/(Math.max(r/255.0 ,g/255.0, b/255.0)-Math.min(r/255.0 ,g/255.0, b/255.0)))+240)%360):(-1)))), (Math.max(r/255.0 ,g/255.0, b/255.0)===0)?0:(100*((Math.max(r/255.0 ,g/255.0, b/255.0)-Math.min(r/255.0 ,g/255.0, b/255.0))/Math.max(r/255.0 ,g/255.0, b/255.0))), 100*Math.max(r/255.0 ,g/255.0, b/255.0)]);
```

```js
RGBToHSV(252, 111, 48); // [18.529411764705856, 80.95238095238095, 98.82352941176471]
```
