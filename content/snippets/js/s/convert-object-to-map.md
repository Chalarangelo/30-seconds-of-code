---
title: Convert object to Map
type: snippet
shortTitle: Object to Map
language: javascript
tags: [object]
author: chalarangelo
cover: yellow-shoes
dateModified: 2022-06-16T05:00:00-04:00
---

Converts an object to a `Map`.

- Use `Object.entries()` to convert the object to an array of key-value pairs.
- Use the `Map` constructor to convert the array to a `Map`.

```js
const objectToMap = obj => new Map(Object.entries(obj));
```

```js
objectToMap({a: 1, b: 2}); // Map {'a' => 1, 'b' => 2}
```
