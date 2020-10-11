---
title: sortByObjectAttribute
tags: array,math,function,intermediate
---

Comparator sort helper function for dynamic sort by given key that exist in array of object.

- use `sortByKey` as the comparator function for dynamic sorting by given key

```js
const sortByKey = (inputKey) => {
  let sortOrder = 1; // descending by default
  let key = inputKey;
  
  if (inputKey[0] === '-') {
    sortOrder = -1;
    key = inputKey.substr(1);
  }

  return (a, b) => {
    // use ascending mode if sortOrder === -1
    return sortOrder === -1 ? a[key] - b[key] : b[key] - a[key];
  };
}

```

```js
let arr = [{ a: 7 }, { a: 5 }, { a: 10 }];

arr.sort(sortByKey('-a'));
// output -> [{ a: 5 }, { a: 7 }, { a: 10 }]
arr.sort(sortByKey('a'));
// output -> [{ a: 10 }, { a: 7 }, { a: 5 }]
```
