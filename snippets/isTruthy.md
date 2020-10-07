---
title: isTruthy
tags: object,array,intermediate
---

Checks if the value is truthy. Checks against the following values: `false`, `0`, `""`, `null`, `undefined`, `NaN`, `[]`, and `{}`.

```js
/**
 * Checks if the value is truthy. Checks against the following
 * values: `false`, `0`, `""`, `null`, `undefined`, `NaN`, `[]`,
 * and `{}`.
 *
 * @param o The object in question to check.
 */
const isTruthy = (o) => {
  if (!!o && o.constructor === Object) {
    return !!Object.keys(o).length;
  }
  if (Array.isArray(o)) {
    return !!o.length;
  }
  return !!o;
};
```

```js
isTruthy(false); // false
isTruthy(0); // false
isTruthy(''); // false
isTruthy(null); // false
isTruthy(undefined); // false
isTruthy(NaN); // false
isTruthy([]); // false
isTruthy({}); // false
isTruthy('foo'); // true;
```
