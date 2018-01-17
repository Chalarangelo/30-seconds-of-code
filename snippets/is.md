### is

Checks if the provided value is of the specified type.

Use the `instanceof` operator to check if the provided value is of the specified `type`.

```js
const is = (type, val) => val instanceof type;
```

```js
is(Array,[1]); // true
is(ArrayBuffer, new ArrayBuffer()); // true
is(Map, new Map()); // true
is(RegExp, /./g); // true
is(Set, new Set()); // true
is(WeakMap, new WeakMap()); // true
is(WeakSet, new WeakSet()); // true
```
