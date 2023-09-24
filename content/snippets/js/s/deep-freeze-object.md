---
title: How can I deep freeze an object in JavaScript?
shortTitle: Deep freeze object
type: question
language: javascript
tags: [object]
author: chalarangelo
cover: frozen-globe
excerpt: Learn how mutability works in JavaScript, its applications to objects and how you can properly freeze them to make them constant.
dateModified: 2021-06-12
---

Objects in JavaScript are mutable, regardless if you define them as `const` variables or not. In fact, using `const` when defining an object only prevents the variable from being reassigned. However, you can reassign the properties of a `const` object or array, like this:

```js
const myObj = { a: 10, b: 20, c: 30 };
myObj.a = 12;     // { a: 12, b: 20, c: 30 };

const myArr = [15, 25, 35];
myArr[1] = 28;    // [15, 28, 35];
```

To make an object immutable, we can utilize `Object.freeze()`, which will prevent the addition of new properties and prevent deletion and changes to existing properties to some extent. However, while `Object.freeze()` provides somewhat of a solution, it only mitigates the problem to the next nesting level, as in reality it performs a shallow freeze. This means that properties that are objects or arrays can still be mutated:

```js
const myObj = {
  a: 1,
  b: 'hello',
  c: [0, 1, 2],
  d: { e: 1, f: 2 }
};
Object.freeze(myObj);

myObj.a = 10;
myObj.b = 'hi';
myObj.c[1] = 4;
myObj.d.e = 0;
/*
myObj = {
  a: 1,
  b: 'hello',
  c: [0, 4, 2],
  d: { e: 0, f: 2 }
}
*/
```

As you can see, `Object.freeze()` is a step in the right direction, but only shallow freezes the object. To solve the issue we can use recursion, checking if each property is itself an object and, if `Object.isFrozen()` is `false`, apply `Object.freeze()` to it:

```js
const myObj = {
  a: 1,
  b: 'hello',
  c: [0, 1, 2],
  d: { e: 1, f: 2 }
};

const deepFreeze = obj => {
  Object.keys(obj).forEach(prop => {
    if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) deepFreeze(obj[prop]);
  });
  return Object.freeze(obj);
};
deepFreeze(myObj);

myObj.a = 10;
myObj.b = 'hi';
myObj.c[1] = 4;
myObj.d.e = 0;

/*
myObj = {
  a: 1,
  b: 'hello',
  c: [0, 1, 2],
  d: { e: 1, f: 2 }
}
*/
```

In the above example, we apply the techniques we described previously to ensure that the given object is deeply frozen. You can view the complete code, along with more examples in the [deepFreeze](/js/s/deep-freeze) snippet.
