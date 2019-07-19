### isInteger

Checks if the given argument is a integer.

Use `typeof` to check if a value is classified as a number primitive.
To check the number is integer, using the `String.indexOf` to make sure it doesn't contain `.`.
To safeguard against `NaN`, check if `val === val` (as `NaN` has a `typeof` equal to `number` and is the only value not equal to itself).

```js
const isInteger = val => typeof val === 'number' && String(val).indexOf('.') === -1 && val === val;
```

```js
isNumber(1); // true
isNumber(1.0); // true
isNumber(1.1); // false
isNumber('1'); // false
isNumber(NaN); // false
```
