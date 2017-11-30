## RGB to hexadecimal

Convert each value to a hexadecimal string, using `toString(16)`, then `padStart(2,'0')` to get a 2-digit hexadecimal value.
Combine values using `join('')`.

```js
var rgbToHex = (r, g, b) =>
  [r.toString(16).padStart(2,'0') , g.toString(16).padStart(2,'0') , b.toString(16).padStart(2,'0')].join('');
```
