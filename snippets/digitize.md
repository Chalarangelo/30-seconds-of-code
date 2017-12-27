### digitize

Converts a number to an array of digits.

Convert the number to a string, using spread operators in ES6(`[...string]`) build an array.
Use `Array.map()` and `parseInt()` to transform each value to an integer.

```js
const digitize = n => [...'' + n].map(i => parseInt(i));
```

```js
digitize(123) // [1, 2, 3]
```
