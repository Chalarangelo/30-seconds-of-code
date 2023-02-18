---
title: Nest objects
tags: object,recursion
cover: birds
firstSeen: 2018-02-24T13:49:56+02:00
lastUpdated: 2020-10-21T21:54:53+03:00
---

Nests recursively objects linked to one another in a flat array.

- Use recursion.
- Use `Array.prototype.filter()` to filter the items where the `id` matches the `link`.
- Use `Array.prototype.map()` to map each item to a new object that has a `children` property which recursively nests the items based on which ones are children of the current item.
- Omit the second argument, `id`, to default to `null` which indicates the object is not linked to another one (i.e. it is a top level object).
- Omit the third argument, `link`, to use `'parent_id'` as the default property which links the object to another one by its `id`.

```js
const nest = (items, id = null, link = 'parent_id') =>
  items
    .filter(item => item[link] === id)
    .map(item => ({ ...item, children: nest(items, item.id, link) }));
```

```js
const comments = [
  { id: 1, parent_id: null },
  { id: 2, parent_id: 1 },
  { id: 3, parent_id: 1 },
  { id: 4, parent_id: 2 },
  { id: 5, parent_id: 4 }
];
const nestedComments = nest(comments);
// [{ id: 1, parent_id: null, children: [...] }]
```
