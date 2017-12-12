### Flatten array

Use `reduce()` to get all elements inside the array and `concat()` to flatten them.

```js
const flatten = arr => arr.reduce( (a, v) => a.concat(v), []);
// flatten([1,[2],3,4) -> [1,2,3,4]
```
