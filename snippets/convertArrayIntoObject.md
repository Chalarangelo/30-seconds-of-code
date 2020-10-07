---
title: convertArrayIntoObject
tags: array,object,beginner
---

Converts array into object, or rather a Plain Old Javascript Object.

- In Javascript arrays are technically objects
- However, if you need an array to become a Plain Old Javascript Object, which allows you to have a key/value pairs, you can manually convert them with Object.assign() 
- Object.assign() makes an object from array, making the array indexes object keys and array elements object values

```js
const arr = ['First Name', 'Last Name'];

const obj = Object.assign({}, array);

obj instanceof Object; // true
Array.isArray(obj); // false

```

```js
obj; // { '0': 'First Name', '1': 'Last Name' }
```
