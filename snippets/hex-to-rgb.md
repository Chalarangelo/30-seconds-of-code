### Hexcode to RGB

Use bitwise right-shift operator and mask bits with `&` (and) operator to convert a hexadecimal color code (prefixed with `#`) to a string with the RGB values.

```js
const hexToRgb = hex => {
  const h = parseInt(hex.slice(1), 16);
  return `rgb(${h >> 16}, ${(h & 0x00ff00) >> 8}, ${h & 0x0000ff})`;
}
// hexToRgb('#27ae60') -> 'rgb(39, 174, 96)'
```
