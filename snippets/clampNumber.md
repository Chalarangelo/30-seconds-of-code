### clampNumber

Clamps `num` within the inclusive range specified by the boundary values `a` and `b`.

If `num` falls within the range, return `num`.
Otherwise, return the nearest number in the range.

```js
const clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a,b)),Math.min(a,b));
```

```js
clampNumber(2, 3, 5) // 3
clampNumber(1, -1, -5) // -1
clampNumber(3, 2, 4) // 3
```
