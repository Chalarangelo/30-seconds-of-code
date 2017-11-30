### Initialize array with values

Use `Array(n)` to create an array of the desired length, `fill(v)` to fill it with the desired values.
You can omit `v` to use a default value of `0`.

```js
var initializeArray = (n, v = 0) =>
  Array(n).fill(v);
```
