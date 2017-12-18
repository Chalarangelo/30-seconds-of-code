### Array differenceWith

`filter`s out all values from `arr` for which the comparator `comp(a,b)` function never returns `true`

```js
const differenceWith = (arr, val, comp) => arr.filter(a => !val.find(b => comp(a, b)))

//differenceWith([1, 1.2, 1.5, 3], [1.9, 3], (a,b) => Math.round(a) == Math.round(b)) -> [1, 1.2]
```
