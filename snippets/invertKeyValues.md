### invertKeyValues

Inverts the key-value pairs of an object, without mutating it.

Use `Object.keys()` and `Array.reduce()` to invert the key-value pairs of an object.

```js
const invertKeyValues = obj => Object.keys(obj).reduce((acc,key) => { acc[obj[key]] = key; return acc;},{});
```

```js
invertKeyValues({name:'John', age: 20}) // { 20: 'age', John: 'name' }
```
