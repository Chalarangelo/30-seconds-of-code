### Unique values of array

Use `Array.filter` to remove all duplicate values.

```js
const unique = c => c.filter(i => c.indexOf(i) === c.lastIndexOf(i))
```
