### Randomize order of array

Use `Array.sort()` to reorder elements, utilizing `Math.random()` to randomize the sorting.

```js
const randomizeOrder = arr => arr.sort((a, b) => Math.random() >= 0.5 ? -1 : 1);
// randomizeOrder([1,2,3]) -> [1,3,2]
```
