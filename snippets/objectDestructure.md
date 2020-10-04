---
title: objectDestructure
tags: javascript,object,beginner
---

The **destructuring assignment syntax** is a JavaScript expression that makes it possible to unpack values from objects, into distinct variables.

```js

const object1 = {
  name: 'Jane Doe',
  age: 17,
  phoneNumber: '111-111-1111',

  userName: 'jane-doe',
  about: 'About someone',
};

const object2 = {x: 1, y: 2};

// Destructuring assignment syntax
const {name, age, phoneNumber, ...extra} = object1;

// Assigning to new variable names
const {x: one, y: two} = object2;

```

```js

// Object 1

console.log(name); // 'Jane Doe'

console.log(age); // 17

console.log(phoneNumber); // '111-111-1111'

// The rest of the data is captured in the `extra` variable
console.log(extra); // {'username': 'jane-doe', 'about': 'About someone'}

// Object 2

console.log(one); // 1

console.log(two) // 2

```
