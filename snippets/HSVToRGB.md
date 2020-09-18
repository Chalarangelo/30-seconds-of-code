---
title: HSVToRGB
tags: math, intermediate
---

Converts the values of HSB color components to RGB components.

Convert given HSV parameters into RGB ones and returns it in array format. 
```js
const HSVToRGB = (h,s,v)=> {
                    s/=100; v/=100;
                    const k = (n) => (n + h/60)%6;
                    const f = (n) => v*(1-s*Math.max(0,Math.min(k(n),4-k(n),1)));
                    return [255*f(5),255*f(3),255*f(1)];
                 };
```

```js
HSVToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]
```
