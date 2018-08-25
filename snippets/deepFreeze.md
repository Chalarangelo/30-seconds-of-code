### deepFreeze

Deep freezes an object.

Calls `Object.freeze(obj)` recursively on all unfrozen properties of obj that are `typeof` function or object.

```js
const deepFreeze = obj => {
  Object.freeze(obj);

  Object.getOwnPropertyNames(obj).forEach(function(prop) {
    if (
      obj.hasOwnProperty(prop) &&
      obj[prop] !== null &&
      (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') &&
      !Object.isFrozen(obj[prop])
    ) {
      deepFreeze(obj[prop]);
    }
  });

  return obj;
};
```

```js
'use strict';

const a = Object.freeze([1, [2, 3]]);

a[0] = 3; // not allowed
a[1][0] = 4; // allowed but shouldn't be

const b = deepFreeze([1, [2, 3]]);

b[0] = 3; // not allowed
b[1][0] = 4; // not allowed as well
```
