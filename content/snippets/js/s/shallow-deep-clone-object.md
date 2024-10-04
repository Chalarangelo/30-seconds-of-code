---
title: How can I clone an object in JavaScript?
shortTitle: Deep clone object
language: javascript
tags: [object,recursion]
cover: pagodas
excerpt: Learn how JavaScript handles mutable data, such as objects and arrays, and understand how shallow cloning and deep cloning work.
listed: true
dateModified: 2024-01-04
---

JavaScript's primitive data types are immutable, meaning their value cannot change once created. However, **objects and arrays are mutable**, allowing their value to be altered after creation.

What this means in practice is that primitives are passed by value, whereas objects and arrays are **passed by reference**. Consider the following example:

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

As you can see, the object is passed by reference to `objCopy`. Changing one of the variables will affect the other one, as they **both reference the same object**. So how can we remedy this issue? Cloning the object is the answer.

## Shallow cloning

Using the spread operator (`...`) or `Object.assign()`, we can clone the object and create a new one from its properties.


```js
const shallowClone = obj => Object.assign({}, obj);

let obj = { a: 1, b: 2};
let clone = shallowClone(obj);
let otherClone = shallowClone(obj);

clone.b = 4;
otherClone.b = 6;
// obj = { a: 1, b: 2}
// clone = { a: 1, b: 4 }
// otherClone = { a: 1, b: 6 }
```

This technique is known as **shallow cloning**, as it will work for the outer (shallow) object, but fail if we have nested (deep) objects which will ultimately be passed by reference. Which brings us to the next section.

## Deep cloning

In order to create a **deep clone** of an object, we need to recursively clone every nested object, cloning nested objects and arrays along the way.

> [!IMPORTANT]
>
> Some solutions around the web use `JSON.stringify()` and `JSON.parse()`. While this approach might work in some cases, it's plagued by numerous issues and performance problems, so I would advise against using it.

Starting with the edge cases, we need to check if the passed object is `null` and, if so, return `null`. Otherwise, we can use `Object.assign()` and an empty object (`{}`) to create a shallow clone of the original.

Next, we'll use `Object.keys()` and `Array.prototype.forEach()` to determine which key-value pairs need to be deep cloned. If the object is an `Array`, we'll set the `clone`'s `length` to that of the original and use `Array.from()` to create a clone. Otherwise, we'll recursively call the function with the current value as the argument.

```js
const deepClone = obj => {
  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key =>
      (clone[key] =
        typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};

const a = { foo: 'bar', obj: { a: 1, b: 2 } };
const b = deepClone(a); // a !== b, a.obj !== b.obj
```

This code snippet is designed specifically with plain objects and arrays in mind. This means that it can't handle **class instances**, **functions** and other special cases. So, how can we handle these cases? JavaScript recently gave us a new tool to solve this problem!

## Deep cloning using `structuredClone()`

Apparently, cloning is a fairly common and important problem. So much so that JavaScript introduced the `structuredClone()` global function, which can be used to **deep clone objects**. Instead of implementing a complicated recursive function, we can simply use this function to clone the object.

```js
const a = { x: 1, y: { y1: 'a' }, z: new Set([1, 2]) };
const b = structuredClone(a); // a !== b, a.y !== b.y, a.z !== b.z
```

This technique can be used for both **arrays and objects**, requires minimal code and is the recommended way of cloning objects in JavaScript, as it's the most **performant and reliable**.

> [!NOTE]
>
> The `structuredClone()` function is a fairly recent addition to the language. Even so, it's supported by all modern browsers and Node.js since **v17.0.0**.
