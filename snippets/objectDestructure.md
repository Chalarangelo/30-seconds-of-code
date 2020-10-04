---
title: objectDestructure
tags: javascript,object,intermediate
---

Easily unpack an object into variables using **destructuring assignment syntax**. Using this syntax, we can:

- Extract data from an object and assign it to variables, using less code.
- Increase readability of our code.

```js
const object = {
  name: 'Jane Doe',
  age: 17,
  phoneNumber: '111-111-1111',
};

// Here we are extracting data from this object and assigning it to variables
const {name, age, phoneNumber} = object;

// Note: the variable names used should be same as the keys of the object.
```

```js
console.log(name); // 'Jane Doe'

console.log(age); // 17

console.log(phoneNumber); // '111-111-1111'
```
