---
title: Matches object properties based on function
tags: object
expertise: intermediate
cover: undefined
firstSeen: 2018-01-23T20:17:32+02:00
lastUpdated: 2020-10-21T21:54:53+03:00
---

Compares two objects to determine if the first one contains equivalent property values to the second one, based on a provided function.

- Use `Object.keys()` to get all the keys of the second object.
- Use `Array.prototype.every()`, `Object.prototype.hasOwnProperty()` and the provided function to determine if all keys exist in the first object and have equivalent values.
- If no function is provided, the values will be compared using the equality operator.

```js
const matchesWith = (obj, source, fn) =>
  Object.keys(source).every(key =>
    obj.hasOwnProperty(key) && fn
      ? fn(obj[key], source[key], key, obj, source)
      : obj[key] == source[key]
  );
```

```js
const isGreeting = val => /^h(?:i|ello)$/.test(val);
matchesWith(
  { greeting: 'hello' },
  { greeting: 'hi' },
  (oV, sV) => isGreeting(oV) && isGreeting(sV)
); // true
```
