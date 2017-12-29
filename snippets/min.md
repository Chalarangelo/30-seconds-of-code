### min

Returns the minimum value in an array.

Use `Math.min()` combined with the spread operator (`...`) to get the minimum value in the array.

```js
const min = arr => Math.min(...[].concat(...arr));
```

```js
min([10, 1, 5]); // 1
```
