### dropProperties

Removes properties (objects key-value pairs) of an array of objects.

Use spread operator (`...`) to accept single or multiple properties keys (strings) for removal. Use `Array.prototype.map` to iterate through input properties keys for removal. Use `Array.prototype.forEach()` to mutate each object of the array. Use `delete` to remove the property from each object.

```js
const dropProperties = (objArr, ...propKeys) => {
  propKeys.map(propKey => objArr.forEach(obj => delete obj[propKey]));
  return objArr;
};
```

```js
dropProperties(
  [{ id: 1, name: "jon", age: 19 }, { id: 2, name: "jane", age: 21 }],
  "name",
  "age"
); // [ { id: 1 }, { id: 2 } ]
```
