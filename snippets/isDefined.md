---
title: isDefined
tags: type,beginner
---

Returns `true` if the specified value is defined (not null or undefined), `false` otherwise.

- Use the equality operator (non-strict) to check if the value of `val` is not equal to `null`.

```js
const isDefined = val => !(val == null);
```

```js
isDefined(null); // false
isDefined(undefined); // false
isDefined(''); // true
isDefined(false); // true
isDefined(0); // true
const foo= {bar:1}
isDefined(foo.bar); // true
isDefined(foo.baz); //false
```
