### objectToPairs

Creates an array of key-value pair arrays from an object.

Use `Object.keys()` and `Array.map()` to iterate over the object's keys and produce an array with key-value pairs.

```js
const objectToPairs = obj => Object.keys(obj).map(k => [k, obj[k]]);
```

```js
objectToPairs({a: 1, b: 2}) // [['a',1],['b',2]])
```
