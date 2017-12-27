### digitize

Converts a number to an array of digits.

Convert the number to a string, using spread operators in ES6(`[...string]`) build an array.
Use `Array.map()` and `parseInt()` to transform each value to an integer.

```js
const digitize = n => [...''+n].map(i => parseInt(i));
```

```js
differenceWith([1, 1.2, 1.5, 3], [1.9, 3], (a,b) => Math.round(a) == Math.round(b)) // [1, 1.2]
```
