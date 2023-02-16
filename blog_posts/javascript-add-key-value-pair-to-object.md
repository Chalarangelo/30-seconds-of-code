---
title: How can I add a key-value pair to a JavaScript object?
shortTitle: Add key-value pair to object
type: question
tags: javascript,object
author: chalarangelo
cover: pineapple-laptop
excerpt: Adding a key-value pair to a JavaScript object is straightforward, yet there are multiple ways available to do so.
firstSeen: 2022-07-21T05:00:00-04:00
---

Adding a key-value pair to a JavaScript object is straightforward, yet there are multiple ways available to do so. While mostly similar, these approaches have some differences that you should be aware of.

### Dot notation

The most common and straightforward way to add a key-value pair to an object is to use the dot notation. You have probably already used this in the past, and it's sufficient in most situations you will encounter.

```js
const obj = { a: 1 };
obj.b = 2;
obj.c = 3;
// obj = { a: 1, b: 2, c: 3 }
```

### Square bracket notation

Similar to dot notation, square bracket notation comes in handy when dealing with **dynamic keys**, but can also work with static keys. Apart from that, it's exactly the same as dot notation both in functionality and performance.

```js
const obj = { a: 1 };
const bKey = 'b';
obj[bKey] = 2;
obj['c'] = 3;
// obj = { a: 1, b: 2, c: 3 }
```

### Object.assign()

`Object.assign()` is slightly different than the previous two options. It can be used to add multiple properties to an object at once and it can also **shallow merge** two or more objects. It is not as performant, however, so it should only be used when necessary.

```js
const obj = { a: 1 };
Object.assign(obj, { b: 2 }, { c: 3 });
// obj = { a: 1, b: 2, c: 3 }
```

### Object.defineProperty()

Another, less-common, way to add a key-value pair to an object is to use `Object.defineProperty()`. This is the lest performant way to add a key-value pair to an object, but it allows the new property to be **precisely defined**. This function accepts either a data or accessor descriptor as its second argument, allowing the behavior of the new property to be customized as desired. Bear in mind that you can add multiple properties at once, using `Object.defineProperties()`.

```js
const obj = { a: 1 };
Object.defineProperty(obj, 'b', {
  value: 2,
  enumerable: true,
  configurable: true,
  writable: true
});
Object.defineProperty(obj, 'c', {
  value: 3,
  enumerable: true,
  configurable: true,
  writable: true
});
// obj = { a: 1, b: 2, c: 3 }
```

### Object spread operator

Last but not least, there's the object spread operator (`...`). Contrary to previous methods, this one **doesn't mutate the original object**, but instead returns a new object with the added properties. As expected, the performance of this approach is significantly worse than previous ones, due to the need to create a new object.

```js
const obj = { a: 1 };
const newObj = { ...obj, b: 2, c: 3 };
// obj = { a: 1 }
// newObj = { a: 1, b: 2, c: 3 }
```
