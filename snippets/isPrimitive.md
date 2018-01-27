### isPrimitive

Returns a boolean determining if the passed value is primitive or not.

Use `Array.includes()` on an array of type strings which are not primitive,
supplying the type using `typeof`.
Since `typeof null` evaluates to `'object'`, it needs to be directly compared.

```js
const isPrimitive = val => !['object', 'function'].includes(typeof val) || val === null;
```

```js
isPrimitive(null); // true
isPrimitive(50); // true
isPrimitive('Hello!'); // true
isPrimitive(false); // true
isPrimitive(Symbol()); // true
isPrimitive([]); // false
```
