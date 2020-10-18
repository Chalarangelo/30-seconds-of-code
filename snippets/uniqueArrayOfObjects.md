---
title: uniqueArrayOfObjects
tags: array,intermediate
---

Returns all unique objects in an array. Considers deeply nested values inside the objects. 

- JSON stringify each object in array.
- Create a `Set` from the given stringified objects. Internally, `Set` datastructure removes the duplicated strings.
- Create an `Array` from the `Set` using `Array.from` method.
- Since, we need the objects back so map over the Array of strings with `JSON.parse`

```js
const uniqueArrayOfObjects = array => Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);
```

```js
const array = [
    {
        name: "Test 1",
        nested: {
            val: 1
        }
    },
    {
        name: "Test 1",
        nested: {
            val: 2
        }
    },
    {
        name: "Test 1",
        nested: {
            val: 1
        }
    },
];

// Output:
// [
//     {
//         name: "Test 1",
//         nested: {
//             val: 1
//         }
//     },
//     {
//         name: "Test 1",
//         nested: {
//             val: 2
//         }
//     },
// ]
uniqueArrayOfObjects(array);
```
