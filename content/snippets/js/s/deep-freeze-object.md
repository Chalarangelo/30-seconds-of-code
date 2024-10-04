---
title: How can I deep freeze an object in JavaScript?
shortTitle: Deep freeze object
language: javascript
tags: [object,recursion]
cover: frozen-globe
excerpt: Learn how mutability works in JavaScript, its applications to objects and how you can properly freeze them to make them constant.
listed: true
dateModified: 2024-06-04
---

Objects in JavaScript are **mutable**, regardless if you define them as `const` variables or not. In fact, using `const` when defining an object only prevents the variable from being reassigned. However, you can reassign the properties of a `const` object or array.

```js
const myObj = { a: 10, b: 20, c: 30 };
myObj.a = 12;     // { a: 12, b: 20, c: 30 };

const myArr = [15, 25, 35];
myArr[1] = 28;    // [15, 28, 35];
```

## `Object.freeze()` vs `Object.seal()`

In order to make an object **immutable**, you can use either `Object.freeze()` and `Object.seal()`. Although similar, they have a key difference that you need to remember.

```js
const frozen = Object.freeze({ username: 'johnsmith' });
const sealed = Object.seal({ username: 'johnsmith' });

frozen.name = 'John Smith';  // frozen = { username: 'johnsmith' }
sealed.name = 'John Smith';  // sealed = { username: 'johnsmith' }

delete frozen.username;      // frozen = { username: 'johnsmith' }
delete sealed.username;      // sealed = { username: 'johnsmith' }

frozen.username = 'jsmith';  // frozen = { username: 'johnsmith' }
sealed.username = 'jsmith';  // sealed = { username: 'jsmith' }
```

Both of these methods prevent **new properties** from being added and **existing properties** from being removed. Additionally, `Object.freeze()` also prevents existing properties from being **altered**. The reason for that is that `Object.seal()` only marks existing properties as non-configurable, meaning their values can be changed as long as they are writable.

|  | Create | Read | Update | Delete |
| --- | --- | --- | --- | --- |
| `Object.freeze()` | No | Yes | No | No |
| `Object.seal()` | No | Yes | Yes | No |

> [!TIP]
>
> In general, we prefer to use `Object.freeze()` as it covers more use cases and provides a more robust solution.

## Deep freezing an object

Both of the aforementioned methods perform a **shallow freeze** on the object. This means that **nested objects and arrays** are not frozen and can be mutated.

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

In order to prevent that, you can **recursively** iterate over the object, using `Object.keys()` and `Array.prototype.forEach()` to check if each property is an object and, if it is, apply `Object.freeze()` to it. This will also handle arrays, as they are considered objects in JavaScript.

```js
const deepFreeze = obj => {
  Object.keys(obj).forEach(prop => {
    if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) deepFreeze(obj[prop]);
  });
  return Object.freeze(obj);
};

const myObj = {
  a: 1,
  b: 'hello',
  c: [0, 1, 2],
  d: { e: 1, f: 2 }
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

### Frozen objects in strict mode

As a side note, if your code is running in **strict mode**, frozen objects will **throw an error** when trying to modify them. This makes it easier to catch bugs, as you will be notified immediately if you try to change a frozen object.

```js
'use strict';

const val = deepFreeze([1, [2, 3]]);

val[0] = 3; // not allowed
val[1][0] = 4; // not allowed as well
```

### Checking if an object is deep frozen

Checking if an object is frozen is simple, using `Object.isFrozen()`. However, to check if an object is deeply frozen, you will have to perform a **recursive check** on all its properties. This is very similar to how you would go about deep freezing the object in the first place, but instead of `Array.prototype.forEach()`, you can use `Array.prototype.every()` to check if all properties are deeply frozen.

```js
const isDeepFrozen = obj =>
  Object.isFrozen(obj) &&
  Object.keys(obj).every(
    prop => typeof obj[prop] !== 'object' || isDeepFrozen(obj[prop])
  );

const x = Object.freeze({ a: 1 });
const y = Object.freeze({ b: { c: 2 } });
isDeepFrozen(x); // true
isDeepFrozen(y); // false
```

## Freezing complex objects

For **non-plain objects**, such as `Set` or `Map`, you can override their methods to prevent them from being used. This effectively freezes the object, preventing any changes to it.

> [!NOTE]
>
> `Set` and `Map` are used as a starting point for the following examples. You can apply the same principles to other non-plain objects.

### Freezing a `Set` object

In order to freeze a `Set` object, you can simply set the `Set.prototype.add()`, `Set.prototype.delete()` and `Set.prototype.clear()` methods to `undefined`. This will effectively prevent them from being used, practically freezing the object. In addition to that, you can use `Object.freeze()` to freeze the `Set` object itself.

```js
const frozenSet = iterable => {
  const s = new Set(iterable);
  s.add = undefined;
  s.delete = undefined;
  s.clear = undefined;
  return Object.freeze(s);
};

frozenSet([1, 2, 3, 1, 2]);
/* Set {
  1, 2, 3,
  add: undefined, delete: undefined, clear: undefined
} */
```

### Freezing a `Map` object

Freezing a `Map` object is very similar to freezing a `Set` object. You can set the `Map.prototype.set()`, `Map.prototype.delete()` and `Map.prototype.clear()` methods to `undefined` and then use `Object.freeze()` to freeze the `Map` object itself.

```js
const frozenMap = iterable => {
  const m = new Map(iterable);
  m.set = undefined;
  m.delete = undefined;
  m.clear = undefined;
  return Object.freeze(m);
};

frozenMap([['a', 1], ['b', 2]]);
/* Map {
  'a' => 1, 'b' => 2,
  set: undefined, delete: undefined, clear: undefined
} */
```
