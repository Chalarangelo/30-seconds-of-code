---
title: Convert an array of objects to object of objects
tags: array,object,intermediate
---

Convert an array of objects to object of objects.  See code example for source data example.
- Use mutable object to collect **result** from loop
- Use `Object.keys()` and `Array.prototype.includes()` to check if object already has value with given key
- Use `JSON.stringify()` to format faulty data for exception
- Use exceptions for error handling if data is not compatible with the algorithm

```js
function convert (data, keyname) {
    if (data == null || keyname == null) {
        return {}
    }

    let result = {}
    data.forEach(el => {
        if (!isObject(el)) {
            throw new Error(`Array member is not an object: ${JSON.stringify(el)}`)
        }

        const keyValue = el[keyname]
        if (Object.keys(result).includes(keyValue)) {
            throw new Error(`Duplicate key value usage: ${keyValue}`)
        }

        if (keyValue == null) {
            throw new Error(`Given key not from from: ${JSON.stringify(el)}`)
        }

        result[keyValue] = el
    })
    return result
}
```

```js
let sampleInput = [
  {key: 'abc', value1: 123, value2: 'value2ofabc'},
  {key: 'def', value1: 234, value2: 'value2ofdef'}
]
let result = functionName(sampleInput, 'key');
/*
result =
{
  abc: {key: 'abc', value1: 123, value2: 'value2ofabc'},
  def: {key: 'def', value1: 234, value2: 'value2ofdef'}
}
*/
```