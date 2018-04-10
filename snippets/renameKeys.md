### renameKeys

Renames multiple object keys

Get the object's keys with `Object.keys()` and return an object with the new keys, according to the `keysMap`, using `Array.reduce()`.

The initial value is an empty object which is used as the accumulator, `acc`, in the callback function. Using the spread operator `(...)`, `acc` is continuously merged with a new object containing the new key and original object's value. If a new key doesn't exist, fallback to original object's key.

```js
const renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] }
    }),
    {}
  );
```

```js
const obj = { name: 'Bobo', job: 'Front-End Master', shoeSize: 100 };
renameKeys({ name: 'firstName', job: 'passion' }, obj);
// { firstName: 'Bobo', passion: 'Front-End Master', shoeSize: 100 }
```
