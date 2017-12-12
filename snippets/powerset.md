### Powerset

Use `reduce()` combined with `map()` to iterate over elements and combine into an array containing all combinations.

```js
const powerset = arr =>
  arr.reduce( (a,v) => a.concat(a.map( r => [v].concat(r) )), [[]]);
// powerset([1,2]) -> [[], [1], [2], [2,1]]
```
