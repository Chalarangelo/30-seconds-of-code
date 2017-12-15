### Hexcode to RGB

Converts hexadecimal colorcodes to RGB colorcodes by matching the hexidecimal (two-digit) red, green and blue values and 
mapping their decimal equivalents to an array [r, g, b]. Returns a string `rgb(r,g,b)`.

```js
const hexToRgb = hex => `rgb(${hex.slice(1).match(/.{2}/g).map(x => parseInt(x, 16)).join()})`
// hexToRgb('#27ae60') -> 'rgb(39,174,96)'
// hexToRgb('#aaa') -> '[170, 170, 170]'
```
