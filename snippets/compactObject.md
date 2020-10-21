---
title: compactObject
tags: object, array, recursion, intermediate
---

Remove all falsy element from an Object/Array deeply

- Get array of key and value from object using `Object.entries()`
- Then use `Array.prototype.reduce()` with `{}` as initial value to then create new compacted Object
- Callback inside `Array.prototype.reduce()` check if current value is not falsy then assign to the new created Object
- Using ternary operator during assignment, if current assigned value is object then it will recursively compact the object otherwise it will directly assigned
- 🎉 **BONUS:** It work for array too, just pass true value on second parameter if you want in array forms
- ⚠️ **NOTICE:** I'm sorry before, because I'm not sure if this function can handle all cases

```js
const compactObject = (val, toArray = false) => {
  return Object.entries(val).reduce(
    (compacted, [key, value]) => {
      if (Boolean(value))
        compacted[key] = (typeof value === 'object') ? compact(value) : value;
      return compacted;
    },
    toArray ? [] : {}
  );
}
```

```js
const example = {
  nullValue: null,
  falseBool: false,
  trueBool: true,
  falsyNumber: 0,
  acceptedNumber: 100,
  negativeNumber: -100,
  falsyString: '',
  acceptedString: 'accepted string',
  arrayValue: [null, false,true, 0, 100, -100, '', 'accepted string'],
  objectValue: {
    nullValue: null,
    falseBool: false,
    trueBool: true,
    falsyNumber: 0,
    acceptedNumber: 100,
    negativeNumber: -100,
    falsyString: '',
    acceptedString: 'accepted string',
    arrayValue: [null, false,true, 0, 100, -100, '', 'accepted string']
  },
  someFunction() {
    console.log('this is function');
  }
}

compact(user);
/* Output
{
  trueBool: true,
  acceptedNumber: 100,
  negativeNumber: -100,
  acceptedString: 'accepted string',
  arrayValue: {
    2: true,
    4: 100,
    5: -100,
    7: 'accepted string'
  },
  objectValue: {
    trueBool: true,
    acceptedNumber: 100,
    negativeNumber: -100,
    acceptedString: 'accepted string',
    arrayValue: {
      2: true,
      4: 100,
      5: -100,
      7: 'accepted string'
    }
  },
  someFunction() {
    console.log('this is function');
  }
}
*/
```
