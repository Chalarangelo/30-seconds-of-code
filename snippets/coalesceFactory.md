---
title: Argument coalescing factory
tags: function,type
expertise: intermediate
cover: blog_images/coffee-phone-tray.jpg
firstSeen: 2017-12-18T12:15:36+02:00
lastUpdated: 2020-10-22T20:23:47+03:00
---

Customizes a coalesce function that returns the first argument which is `true` based on the given validator.

- Use `Array.prototype.find()` to return the first argument that returns `true` from the provided argument validation function, `valid`.

```js
const coalesceFactory = valid => (...args) => args.find(valid);
```

```js
const customCoalesce = coalesceFactory(
  v => ![null, undefined, '', NaN].includes(v)
);
customCoalesce(undefined, null, NaN, '', 'Waldo'); // 'Waldo'
```
