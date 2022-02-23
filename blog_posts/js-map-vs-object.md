---
title: What are the differences between Maps and objects in JavaScript?
type: question
tags: javascript,object
author: chalarangelo
cover: blog_images/tent-stars.jpg
excerpt: Maps and objects are very similar, but they have some differences that can help you decide which one better fits your use-case.
firstSeen: 2022-02-13T05:00:00-04:00
---

Most JavaScript developers are familiar with objects and probably use them every day. Maps, on the other hand, are not as common but are still very useful. While very similar to objects on the surface, they have some very important differences. Let's take a look at them.

### Key types

Object keys are limited to using only strings and symbols. Maps, on the other hand, can use values of any type as their keys, including functions and objects. This can come in handy in many different scenarios, such as memoization and data association.

```js
const people = [
  { id: 1, name: 'John', surname: 'Doe', age: 30 },
  { id: 2, name: 'Jane', surname: 'Doe', age: 28 },
];

const peopleIndex = people.reduce((index, person) => {
  index[person.id] = `${person.name} ${person.surname}`;
  return index;
}, {});
// peopleIndex = {
//   '1': 'John Doe',
//   '2': 'Jane Doe',
// }

const peopleIndexMap = new Map(
  people.map(person => [person, `${person.name} ${person.surname}`])
);

// peopleIndexMap = Map {
//   { id: 1, name: 'John', surname: 'Doe', age: 30 } => 'John Doe',
//   { id: 2, name: 'Jane', surname: 'Doe', age: 28 } => 'Jane Doe',
// }
```

### Iteration

Object iteration is usually accomplished using `Object.keys()`, `Object.values()` or `Object.entries()`. All of these methods are available on Maps as part of their prototype, but they are significantly more efficient. The reason for this is that these Map methods return iterators, which are lazy and only iterate over the keys or values when they are needed. Additionally, Maps expose an iterator, which can be used with `for...of` loops.

```js
const obj = { a: 1, b: 2, c: 3 };
const objEntries = Object.entries(obj);
// ['a', 1], ['b', 2], ['c', 3]
for (const [key, value] of objEntries)
  console.log(`${key}: ${value}`);

const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
const mapEntries = [...map.entries()]; // Same as [...map]
// [['a', 1], ['b', 2], ['c', 3]]
for (const [key, value] of map)
  console.log(`${key} => ${value}`);
```

### Other differences

Apart from the two main differences mentioned already, there are some other, less noticeable, ones. These include the following:

- Object size requires manual computation. Maps, on the other hand, have a built-in `size` property that can be used to track the number of key-value pairs.
- You can check for a given key's presence in an object using the `in` operator or `Object.prototype.hasOwnProperty()`. `Map.prototype.has()` accomplishes the same thing for Maps.
- Clearing an object requires manual operation and might be non-trivial in some cases. Maps solve this problem via the use of `Map.prototype.clear()`.
- Objects inherit some keys from the prototype, whereas maps do not.
