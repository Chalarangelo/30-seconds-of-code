---
title: objectDestructure
tags: javascript,object,beginner
---

Easily unpack an object into variables using **destructuring assignment syntax**. Using this syntax, we can:

- Extract data from objects and assign it to variables, using less code.
- Increase readability of our code.

```js
const object = {
  name: 'Jane Doe',
  age: 17,
  phoneNumber: '111-111-1111',
};

// Destructuring assignment syntax
const {name, age, phoneNumber} = object;
```

```js
console.log(name); // 'Jane Doe'

console.log(age); // 17

console.log(phoneNumber); // '111-111-1111'
```
