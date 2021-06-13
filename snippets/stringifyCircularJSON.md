---
title: stringifyCircularJSON
tags: object,advanced
firstSeen: 2020-10-06T12:32:28+03:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Serializes a JSON object containing circular references into a JSON format.

- Create a `new WeakSet()` to store and check seen values, using `WeakSet.prototype.add()` and `WeakSet.prototype.has()`.
- Use `JSON.stringify()` with a custom replacer function that omits values already in `seen`, adding new values as necessary.
- ⚠️ **NOTICE:** This function finds and removes circular references, which causes circular data loss in the serialized JSON.

```js
const stringifyCircularJSON = obj => {
  const seen = new WeakSet();
  return JSON.stringify(obj, (k, v) => {
    if (v !== null && typeof v === 'object') {
      if (seen.has(v)) return;
      seen.add(v);
    }
    return v;
  });
};
```

```js
const obj = { n: 42 };
obj.obj = obj;
stringifyCircularJSON(obj); // '{"n": 42}'
```
