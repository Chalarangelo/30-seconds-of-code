### Object from key-value pairs

Use `Array.reduce()` to create and combine key-value pairs.

```js
const objectFromPairs = arr =>
  Object.assign(...arr.map( v => {return {[v[0]] : v[1]};} ));
```
