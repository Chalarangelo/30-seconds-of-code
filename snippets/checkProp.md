---
title: checkProp
tags: function,object,intermediate
---

Creates a function that will invoke a predicate function for the specified property on a given object.

- Return a curried function, that will invoke `predicate` for the specified `prop` on `obj` and return a boolean.

```js
const checkProp = (predicate, prop) => obj => !!predicate(obj[prop]);
```

```js
const lengthIs4 = checkProp(l => l === 4, 'length');
lengthIs4([]); // false
lengthIs4([1, 2, 3, 4]); // true
lengthIs4(new Set([1, 2, 3, 4])); // false (Set uses Size, not length)

const session = { user: {} };
const validUserSession = checkProp(u => u.active && !u.disabled, 'user');

validUserSession(session); // false

session.user.active = true;
validUserSession(session); // true

const noLength = checkProp(l => l === undefined, 'length');
noLength([]); // false
noLength({}); // true
noLength(new Set()); // true
```
