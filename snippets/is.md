### is

Checks if the provided value is of the specified type (doesn't work with literals).

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
is(String, ''); // false
is(String, new String('')); // true
is(Number, 1); // false
is(Number, new Number(1)); // true
is(Boolean, true); // false
is(Boolean, new Boolean(true)); // true
```
