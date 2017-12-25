### differenceWith

Filters out all values from an array for which the comparator function does not return `true`.

Use `Array.filter()` and `Array.find()` to find the appropriate values.

```js
const differenceWith = (arr, val, comp) => arr.filter(a => !val.find(b => comp(a, b)))
```

```js
differenceWith([1, 1.2, 1.5, 3], [1.9, 3], (a,b) => Math.round(a) == Math.round(b)) -> [1, 1.2]
```
