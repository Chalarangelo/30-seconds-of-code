### Shallow clone object

Use the object spread operator to spread the properties of the target object into the clone.

```js
const shallowClone = obj => ({ ...obj });
/*
const a = { x: true, y: 1 };
const b = shallowClone(a);
a === b -> false
*/
```
