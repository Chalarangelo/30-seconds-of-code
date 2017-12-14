### Hexadecimal to RGB

Converts hexadecimal colorcodes to RGB colorcodes by matching the hexidecimal (two-digit) red, green and blue values and 
mapping their decimal equivalents to an array [r, g, b]. Works also with shorthand hex triplets such as "#05F".

```js
const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))
// hexToRgb('#27ae60') -> '[39, 174, 96]'
// hexToRgb('#aaa') -> '[170, 170, 170]'
```
