---
title: JavaScript property enumerability
shortTitle: Property enumerability
type: story
tags: javascript,object
author: chalarangelo
cover: blog_images/old-consoles.jpg
excerpt: Property enumerability dictates how JavaScript object properties behave in different scenarios.
firstSeen: 2022-09-11T05:00:00-04:00
---

In most cases, object properties are enumerable by default, unless they are Symbols. This means that you can use the `for...in` loop to iterate over the properties of an object. Similarly, enumerable properties appear in object methods that enumerate the properties of an object. An example of this is the `Object.keys()` method, which will omit properties that are not enumerable. Finally, when using the object spread operator (`...`), only enumerable properties are copied to the new object.

```js
const person = {
  name: 'John',
  surname: 'Doe',
  age: 30,
  socialSecurityNumber: '123-45-6789',
};

Object.defineProperty(person, 'socialSecurityNumber', {
  enumerable: false,
});

person.hasOwnProperty('socialSecurityNumber'); // true
person.propertyIsEnumerable('socialSecurityNumber'); // false

Object.keys(person); // ['name', 'surname', 'age']
Object.getOwnPropertyNames(person);
// ['name', 'surname', 'age', 'socialSecurityNumber']

const clone = { ...person };
clone.socialSecurityNumber; // undefined
```

To create a non-enumerable property, you can use `Object.defineProperty()` with the appropriate descriptor. You can check for the property's existence, using `Object.prototype.hasOwnProperty()` and for its enumerability, using `Object.prototype.propertyIsEnumerable()`. Additionally, in contrast to Symbols, non-enumerable properties will show up when using `Object.getOwnPropertyNames()`.
