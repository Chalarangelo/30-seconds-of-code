### 3-digit hexcode to 6-digit hexcode

Use `Array.map()`, `split()` and `Array.join()` to join the mapped array for converting a three-digit RGB notated hexadecimal color-code to the six-digit form.
`Array.slice()` is used to remove `#` from string start since it's added once.
```js
const convertHex = shortHex =>
  '#' + shortHex.slice(shortHex.startsWith('#') ? 1 : 0).split().map(x => x+x).join()
// convertHex('#03f') -> '#0033ff'
// convertHex('05a') -> '#0055aa'
```
