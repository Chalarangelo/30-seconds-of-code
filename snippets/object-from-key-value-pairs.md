### Object from key-value pairs

Use `map()` to create objects for each key-value pair, combine with `Object.assign()`.

```js
const objectFromPairs = arr =>
  Object.assign(...arr.map( v => {return {[v[0]] : v[1]};} ));
```
