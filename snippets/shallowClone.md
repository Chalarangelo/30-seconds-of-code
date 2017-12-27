### shallowClone

Creates a shallow clone of an object.

Use `Object.assign()` and an empty object (`{}`) to create a shallow clone of the original.

```js
const shallowClone = obj => Object.assign({}, obj);
```

```js
const a = { x: true, y: 1 };
const b = shallowClone(a);
a === b // false
```
