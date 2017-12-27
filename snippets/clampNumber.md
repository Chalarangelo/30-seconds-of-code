### clampNumber

Clamps `num` within the inclusive `lower` and `upper` bounds.

If `lower` is greater than `upper`, swap them. 
If `num` falls within the range, return `num`. 
Otherwise, return the nearest number in the range.

```js
const clampNumber = (num, lower, upper) => {
  if (lower > upper) upper = [lower, lower = upper][0];
  return (num >= lower && num <= upper) ? num : ((num < lower) ? lower : upper);
};
// clampNumber(2, 3, 5) -> 3
// clampNumber(1, -1, -5) -> -1
// clampNumber(3, 2, 4) -> 3
```
