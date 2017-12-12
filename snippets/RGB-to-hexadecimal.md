### RGB to hexadecimal

Convert each value to a hexadecimal string, using `toString(16)`, then `padStart(2,'0')` to get a 2-digit hexadecimal value.
Combine values using `join('')`.

```js
const rgbToHex = (r, g, b) =>
  [r,g,b].map( v => v.toString(16).padStart(2,'0')).join('');
// rgbToHex(0, 127, 255) -> '007fff'
```
