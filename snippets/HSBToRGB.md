---
title: HSBToRGB
tags: math, intermediate
---

- Range of parameter values:
  - h : [0,360]
  - s : [0,100]
  - b : [0,100]
  

- Converts given HSB parameters into RGB ones using [this](https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB) method and returns it in array format. 

```js
const HSBToRGB = (h,s,b)=> {
  s/=100; b/=100;
  const k = (n) => (n + h/60)%6;
  const f = (n) => b*(1-s*Math.max(0,Math.min(k(n),4-k(n),1)));
  return [255*f(5),255*f(3),255*f(1)];
};
```

```js
HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]
```
