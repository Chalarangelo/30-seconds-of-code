### clampNumber

Clamps `num` within the inclusive range specified by the boundary values `a` and `b`

If `num` falls within the range, return `num`. 
Otherwise, return the nearest number in the range.

```js
const clampNumber = (num, low, high) => Math.max(low, Math.min(num, high));
// clampNumber(2, 3, 5) -> 3
// clampNumber(1, -1, -5) -> -1
// clampNumber(3, 2, 4) -> 3
```
