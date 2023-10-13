---
title: Get nested and unnested value in object
type: snippet
language: javascript
tags: [object, nested, search]
cover: travel-mug-2
dateModified: 2023-10-10
---

Retrieve a value from an object, whether it's nested or unnested, using a specified key.

- The function `getValueByKey` takes two arguments:
  - `getKey`: The key to search for within the object.
  - `obj`: The object in which to search for the key.

- The function recursively searches through nested objects to find the specified key.
- If the key is found, the corresponding value is returned. If not found, it returns `false`.

```js
function getValueByKey(getKey, obj) {
  for (let keys in obj) {
    if (keys === getKey) {
      return obj[keys];
    }

    if (typeof obj[keys] === "object") {
      const result = getValueByKey(getKey, obj[keys]);
      if (result !== undefined) return result;
    }
  }
  return false;
}
```

// Example usage with nested and unnested objects:
const unnestedObject = {
  a: 1,
  b: 2,
  c: 3,
};

const nestedObject = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
      f: 4,
    },
  },
};

```js
const valueFromUnnested = getValueByKey("b", unnestedObject); // Retrieves the value 2
const valueFromNested = getValueByKey("e", nestedObject);     // Retrieves the value 3
const nonExistentKey = getValueByKey("x", unnestedObject);    // Returns false for non-existent key
```