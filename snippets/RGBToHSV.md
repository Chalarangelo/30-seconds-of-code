---
title: RGBToHSV
tags: math, intermediate
---

Converts the values of RGB color components to HSV components.

Convert given RGB parameters into HSV ones and returns it in array format. 
```js
const RGBToHSV =  (r, g, b) => {
                const hsv = [];
                r/=255.0; g/=255.0; b/=255.0;
                const max = Math.max(r,g,b);
                const min = Math.min(r,g,b);
                const diff = max - min;

                //computing h  
                if(max === min){
                    hsv.push(0);
                }else if (max === r){
                    hsv.push((60 * ((g - b) / diff) + 360) % 360);
                }else if(max === g){
                    hsv.push((60 * ((b - r) / diff) + 120) % 360);
                }else{
                    hsv.push((60 * ((r - g) / diff) + 240) % 360);
                }

                //computing s
                if(max === 0){
                    hsv.push(0);
                }else{
                    hsv.push((diff / max) * 100);
                }

                //computing v
                hsv.push(max*100);
                
                return hsv;
            };
```

```js
RGBToHSV(252, 111, 48); // [18.529411764705856, 80.95238095238095, 98.82352941176471]
```
