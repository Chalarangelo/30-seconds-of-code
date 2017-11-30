### Randomize order of array

Use `sort()` to reorder elements, utilizing `Math.random()` to randomize the sorting.

```js
var randomizeOrder = arr => arr.sort( (a,b) => Math.random() >= 0.5 ? -1 : 1)
```
