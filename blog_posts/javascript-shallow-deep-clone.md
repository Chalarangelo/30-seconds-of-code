---
title: How do I clone an object in JavaScript?
shortTitle: Object cloning
type: question
tags: javascript,object
author: chalarangelo
cover: pagodas
excerpt: Learn how JavaScript handles mutable data, such as objects and arrays, and understand how shallow cloning and deep cloning work.
firstSeen: 2020-04-14T16:19:56+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

JavaScript's primitive data types, such as numbers, strings, null, undefined and booleans are immutable, meaning their value cannot change once created. However, **objects and arrays are mutable**, allowing their value to be altered after creation. What this means in practice is that primitives are passed by value, whereas objects and arrays are **passed by reference**. Consider the following example:

```js
let str = 'Hello';
let copy = str;
copy = 'Hi';
// str = 'Hello', copy = 'Hi'

let obj = { a: 1, b: 2 };
let objCopy = obj;
objCopy.b = 4;
// obj = { a: 1, b: 4}, objCopy = { a: 1, b: 4 }
```

What happens in the of `obj` is that the object is passed by reference to `objCopy`, therefore changing the value of one of the variables also affects the other one. `objCopy` is effectively an alias referencing the same object. We can remedy this issue by cloning the object, using a variety of techniques such as the spread operator (`...`) or `Object.assign()` with an empty object:

```js
let obj = { a: 1, b: 2};
let clone = { ...obj };
clone.b = 4;
// obj = { a: 1, b: 2}, clone = { a: 1, b: 4 }

let otherClone = Object.assign({}, obj);
otherClone.b = 6;
clone.b = 4;
// obj = { a: 1, b: 2}, otherClone = { a: 1, b: 6 }
```

Both of these solutions showcase an example of **shallow cloning**, as they will work for the outer (shallow) object, but fail if we have nested (deep) objects which will ultimately be passed by reference. As usual, there are a few approaches to this problem, the simpler of which is using `JSON.stringify()` and `JSON.parse()` to deal with the situation:

```js
let obj = { a: 1, b: { c: 2 } };
let clone = JSON.parse(JSON.stringify(obj));
clone.b.c = 4;
// obj = { a: 1, b: { c: 2 }}, clone = { a: 1, b: { c: 4 } }
```

While the above example works, it has to serialize and deserialize the whole object, which can significantly impact the performance of your code, so it might not be appropriate for larger objects or in projects where performance is important.

Alternatively, you can use a recursive function that deep clones an object and is a lot faster, such as the one in the [deepClone snippet](/js/s/deep-clone). Similarly, if you want a ready-to-use shallow cloning function, you can find one in the [shallowClone snippet](/js/s/shallow-clone).
