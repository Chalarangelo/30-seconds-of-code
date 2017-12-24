### randomHexColorCode

Generates a random hexadecimal color code.

Use `Math.random` to generate a random number and limit that number to fall in between 0 and 16 using `Math.floor`. Use the generated random number as index to access a character from 0 to F. Append it to `color` till the length is not `7`.  

```js
const randomHexColorCode = () => '#'+(Math.random()*0xFFFFFF<<0).toString(16);
// randomHexColorCode() -> "#e34155"
// randomHexColorCode() -> "#fd73a6"
// randomHexColorCode() -> "#4144c6"
```
