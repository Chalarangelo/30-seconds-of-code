### composeRight

Performs left-to-right function composition.

Use `Array.prototype.reduce()` to perform left-to-right function composition.
The first (leftmost) function can accept one or more arguments; the remaining functions must be unary.

```js
const composeRight = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));
```

```js
const add = (x, y) => x + y;
const square = x => x * x;
const addAndSquare = composeRight(add, square);
addAndSquare(1, 2); // 9
```
