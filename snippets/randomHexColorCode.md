### randomHexColorCode

Generates a random hexadecimal color code.

Use `Math.random` to generate a random number and limit that number to fall in between 0 and 16 using `Math.floor`. Use the generated random number as index to access a character from 0 to F. Append it to `color` till the length is not `7`.  

```js
const randomHexColorCode = () => {
	  var color = '#';
	  while(color.length < 7) color += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
	  return color;
}
// randomHexColorCode() -> "#e34155"
// randomHexColorCode() -> "#fd73a6"
// randomHexColorCode() -> "#4144c6"
```
