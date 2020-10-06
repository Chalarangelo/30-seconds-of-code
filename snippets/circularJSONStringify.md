---
title: circularJSONStringify
tags: object,intermediate
---

Serializes valid JSON objects containing circular references into a JSON format.

- Use `JSON.stringify` with a custom replacer
- ⚠️ **NOTICE:** This function finds and removes circular references, what causes data loss

```js
const circularJSONStringify = object => {
  const cache = new WeakSet();
  return JSON.stringify(object, (key, value) => {
    if (value !== null && typeof value === 'object') {
      if (cache.has(value)) return;

      cache.add(value);
    }
    return value;
  });
};
```

```js
const obj = { n: 42 };
obj.obj = obj;

circularJSONStringify(obj); // '{"n": 42}'
```
