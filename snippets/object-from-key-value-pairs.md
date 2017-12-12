### Object from key-value pairs

Use `map()` to create objects for each key-value pair, combine with `Object.assign()`.

```js
var objectFromPairs = arr =>
  Object.assign(...arr.map( v => ({ [v[0]] : v[1] })));
```
