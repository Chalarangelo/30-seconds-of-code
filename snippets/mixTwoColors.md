---
title: mixTwoColors
tags: hexcodes,beginner,math
---

This snippet mixes two colors. For example red+blue=purple.

- First we split each color into its red/green/blue values.
- We take the averages of the reds/greens/blues of the two colors.
- We pad zeroes, so that "9" becomes "09"
- We make the resulting color by concatentaing the red/green/blue of the result.

```js
const mixTwoColors = function(c1, c2) {
            let r1 = parseInt(c1.substr(0,2),16);
            let g1 = parseInt(c1.substr(2,2),16);
            let b1 = parseInt(c1.substr(4,2),16);
            let r2 = parseInt(c2.substr(0,2),16);
            let g2 = parseInt(c2.substr(2,2),16);
            let b2 = parseInt(c2.substr(4,2),16);
            r1 = Math.floor((r1+r2)/2);
            g1 = Math.floor((g1+g2)/2);
            b1 = Math.floor((b1+b2)/2);
            let s1= r1.toString(16);
            while (s1.length < 2) { s1 = '0' + s1; } // Zero pad.
            let s2= g1.toString(16);
            while (s2.length < 2) { s2 = '0' + s2; } // Zero pad.
            let s3= b1.toString(16);
            while (s3.length < 2) { s3 = '0' + s3; } // Zero pad.
            hexStr = s1 + s2 + s3;
            console.log(hexStr);
            return hexStr;  
        }
```

```js
mixTwoColors("FF0000","0000FF"); // 'f700f7'
```
