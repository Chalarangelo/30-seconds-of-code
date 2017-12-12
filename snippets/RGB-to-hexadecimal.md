### RGB to hexadecimal

Convert given RGB parameters to hexadecimal string using bitwise left-shift operator.

```js
const rgbToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
// rgbToHex(255, 165, 1) -> 'ffa501'
```

Think the RGB values as binary, the max value for each will be `255` in decimal and `11111111` (8-bit) in binary. So, the left most side in hexadecimal form is for red value, middle part is green, most right side is blue, as you probably already know. To summarize it over orange `rgb(255, 165, 1)`, `#ffa501` color.

```
                 255      165      1
  (r << 16)   11111111 00000000 00000000
+ (g << 8)    11111111 10100101 00000000
+ (b)         11111111 10100101 00000001

toString(16)     ff       a5       01
```

We simply moving values to their appropriate locations. `padStart(6, '0')` is needed for leading left most zero characters.
