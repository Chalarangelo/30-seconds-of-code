### Validate number

Use `!isNaN` in combination with `parseFloat()` to check if the argument is a number.
Use `isFinite()` to check if the number is finite.

```js
const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n);
```
