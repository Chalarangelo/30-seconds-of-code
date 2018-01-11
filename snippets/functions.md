### functions

Returns an array of function property names from own enumerable properties of object.

Use `Object.keys(obj)` to iterate over the object's own properties, `Array.filter()` to keep only those that are functions.

```js
const functions = obj => Object.keys(obj).filter(key => typeof obj[key] === 'function');
```

```js
function Foo() {
  this.a = () => 1;
  this.b = () => 2;
}
functions(new Foo()); // ['a', 'b']
```
