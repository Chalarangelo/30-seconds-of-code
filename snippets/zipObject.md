### zipObject

Given an Array of valid property identifiers and an Array of values, `zipObject` returns an object mapping the properties to the values
Since an object can have undefined values but not undefined property pointers, the Array of properties is used to decide the structure of the resulting object

```js
const zipObject = (props, values) => props.reduce( ( obj, prop, index ) => (obj[prop] = values[index], obj), {})
/*
zipObject(['a','b','c'], [1,2]) -> {a: 1, b: 2, c: undefined}
*/
```
