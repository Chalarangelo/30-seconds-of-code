### sum

Returns the sum of two or more numbers/arrays.

Use `Array.prototype.reduce()` to add each value to an accumulator, initialized with a value of `0`.

```js
const sum = (...arr) => [...arr].reduce((acc, val) => acc + val, 0);
```

```js
sum(...[1, 2, 3, 4]); // 10
```
