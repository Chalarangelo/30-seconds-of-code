### isNumber

Checks if the given argument is a number.

Use `typeof` to check if a value is classified as a number primitive.

```js
const isNumber = val => typeof val === 'number';
// isNumber('1') -> false
// isNumber(1) -> true
```
