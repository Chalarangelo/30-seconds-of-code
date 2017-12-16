### Array concatenation

Use Array spread operators to concatenate an array with any additional arrays and/or values, specified in `args`.

```js
const ArrayConcat = (arr, ...args) => [...arr,...args]; 
// ArrayConcat([1], [1, 2, 3, [4]]) -> [1, 2, 3, [4]]
```
