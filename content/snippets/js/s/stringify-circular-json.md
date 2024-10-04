---
title: Convert a JSON object with circular references to a JavaScript string
shortTitle: Convert circular JSON to string
language: javascript
tags: [object]
cover: waving-over-lake
excerpt: Circular JSON objects can't be serialized using `JSON.stringify()`, but you can use this trick to handle them.
listed: true
dateModified: 2024-03-18
---

A JSON object is said to have a **circular reference** when it contains a reference to itself. This can happen when an object is nested within itself, or when two or more objects reference each other. When you try to serialize a JSON object with circular references using `JSON.stringify()`, you'll get a `TypeError` because the method can't handle circular references.

In order to handle this, you can traverse the object and use a `WeakSet` to **store and check seen values**, and a custom replacer function to **omit values** already in the `WeakSet`. This will allow you to serialize the JSON object without running into a `TypeError`.

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

const obj = { n: 42 };
obj.obj = obj;
stringifyCircularJSON(obj); // '{"n": 42}'
```

> [!WARNING]
>
> This function finds and removes circular references, which causes **circular data loss** in the serialized JSON. Be sure to handle this data loss appropriately in your application.
