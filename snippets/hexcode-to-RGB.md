### Hexcode to RGB

Use `Array.slice()`, `Array.map()` and `match()` to convert a hexadecimal colorcode (prefixed with `#`) to a string with the RGB values.

```js
const hexToRgb = hex => `rgb(${hex.slice(1).match(/.{2}/g).map(x => parseInt(x, 16)).join()})`
// hexToRgb('#27ae60') -> 'rgb(39,174,96)'
```
