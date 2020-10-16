---
title: array,string
tags: array,intermediate
---

Convert a 1d array to index named object

- Use `Array.prototype.forEach()` to iterate
- Assign it to a var `Obj` and return it

```js
const arrayToObject = (arr) =>
  {
    let obj={},i=0
    arr.forEach(x=>{
      if(isNaN(x))
      {
        obj[i]=x;i++;
      }
    })
    return obj;
  }
```

```js
functionName(['a','b']); // '{0:"a",1:"b"}'
```
