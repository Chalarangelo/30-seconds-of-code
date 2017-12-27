### validateNumber

Returns `true` if the given value is a number, `false` otherwise.

Use `!isNaN` in combination with `parseFloat()` to check if the argument is a number.
Use `isFinite()` to check if the number is finite.
Use `Number()` to check if the coercion holds.

```js
const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;
```

```js
validateNumber('10') // true
```
