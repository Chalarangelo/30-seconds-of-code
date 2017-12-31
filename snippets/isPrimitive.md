### isPrimitive

Returns a boolean determining if the supplied value is primitive or not.

Use `Array.includes()` on an array of type strings, supplying the type using `typeof`.
Since `typeof null` evaluates to `'object'`, it needs to be directly compared.

```js
const isPrimitive = value =>
  ['string', 'number', 'symbol', 'boolean', 'undefined'].includes(typeof value) || value === null;
```

```js
isPrimitive(window.someNonExistentProperty); // true
isPrimitive(null); // true
isPrimitive(50); // true
isPrimitive('Hello!'); // true
isPrimitive(false); // true
isPrimitive(Symbol()); // true
isPrimitive([]); // false
isPrimitive(new String('Hello!')); // false
```
