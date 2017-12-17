### hexToRGB

Converts a colorcode to a `rgb()` string.

Use bitwise right-shift operator and mask bits with `&` (and) operator to convert a hexadecimal color code (prefixed with `#`) to a string with the RGB values. In case it's a 3-digit-colorcode, do the same with the 6-digit-colorcode extended by the extendHex() function (ref. `extendHex` snippet)

```js
const hexToRgb = hex => {
  const extendHex = shortHex => 
    '#' + shortHex.slice(shortHex.startsWith('#') ? 1 : 0).split('').map(x => x+x).join('');
  return hex.slice(1).length==3 ? 
  `rgb(${parseInt(extendHex(hex).slice(1), 16) >> 16}, ${(parseInt(extendHex(hex).slice(1), 16) & 0x00ff00) >> 8}, ${parseInt(extendHex(hex).slice(1), 16) & 0x0000ff})`:
  `rgb(${parseInt(hex.slice(1), 16) >> 16}, ${(parseInt(hex.slice(1), 16) & 0x00ff00) >> 8}, ${parseInt(hex.slice(1), 16) & 0x0000ff})`;
}   
// hexToRgb('#27ae60') -> 'rgb(39, 174, 96)'
// hexToRgb('#acd') -> 'rgb(170, 204, 221)'
```
