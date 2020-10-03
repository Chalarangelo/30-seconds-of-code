---
title: isAnyKeyInObjectNullOrUndefined
tags: object,beginner
---

Returns true if any value in a object is null or undefined.

- Check if the object is already undefined
- Check if the data passed is not an object
- Loop through each key and check for null or undefined

```js
const isAnyKeyInObjectNullOrUndefined = (data) => {
  if (
    !data ||
    typeof data === undefined ||
    typeof data === null ||
    typeof data !== 'object'
  ) {
    return true;
  }

  for (const key in data) {
    if (data[key] === null || data[key] === undefined) {
      return true;
    }
  }
  return false;
};
```

```js
isAnyKeyInObjectNullOrUndefined({ someKey: 'someValue' }); // false
isAnyKeyInObjectNullOrUndefined({ someKey: null }); // true
isAnyKeyInObjectNullOrUndefined({ someKey: undefined }); // true
isAnyKeyInObjectNullOrUndefined('not an object'); // true
isAnyKeyInObjectNullOrUndefined(null); // true
isAnyKeyInObjectNullOrUndefined(); // true
```
