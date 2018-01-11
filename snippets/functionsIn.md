### functionName

Returns an array of function property names from own and inherited enumerable properties of object.

Use `Object.keys(obj)` and `Object.get.PrototypeOf(obj)` to iterate over the object's own and inherited properties, `Array.filter()` to keep only those that are functions.
Use the spread operator (`...`) to combine all returned property names into one array.

```js
const functionsIn = obj =>
  [...Object.keys(obj), ...Object.keys(Object.getPrototypeOf(obj))].filter(key => typeof obj[key] === 'function');
```

```js
function Foo() {
  this.a = () => 1;
  this.b = () => 2;
}
Foo.prototype.c = () => 3;
functionsIn(new Foo); // ['a', 'b', 'c']
```
