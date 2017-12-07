### Powerset

Use `reduce()` combined with `map()` to iterate over elements and combine into an array containing all combinations. 

```js
var powerset = arr =>
  arr.reduce( (a,v) => a.concat(a.map( r => [v].concat(r) )), [[]]);
```
