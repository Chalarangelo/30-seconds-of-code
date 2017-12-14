### Array without

Filters out array elements if they are included in the given `values` arguments

```js
const without = ((arr, ...values) => arr.filter(x => !values.includes(x)))

//without([2, 1, 2, 3], 1, 2); -> [3]
```
