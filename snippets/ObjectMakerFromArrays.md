---
title: ObjectMakerFromArrays
tags: utility,beginner 
---

This snippet will retturn an object which is composed of the two arrays. The first array will make up the keys and the second array will make up the values.

```js
const ObjectMakerFromArrays = (arg1,arg2) =>
  {
    //this function will assume arg1 contains the keys and arg2 contains the values
    let finalObj = {};
    if(arg1.length!== arg2.length){
      return -1
    }
   
    for(let i = 0; i < arg1.length; i++) {
      let currVal = arg2[i];
      let currKey = arg1[i];
      finalObj[currKey] = currVal 
    }
    return finalObj;
  }
  }
```

```js
 ObjectMakerFromArrays([1,2,3],["cat", 'dog', 'mouse']); // {1:"cat",2:"dog",3:"mouse"}
```
