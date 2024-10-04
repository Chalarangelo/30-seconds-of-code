---
title: Nest linked JavaScript objects
shortTitle: Nest objects
language: javascript
tags: [object,recursion]
cover: birds
excerpt: Learn how to recursively nest objects linked to one another in a flat array.
listed: true
dateModified: 2024-06-06
---

More than once in my coding career, I've come across impractical data structures that need transformation. One particularly annoying one was a **flat array of objects** that needed to be linked to one another. To make it easier to work with, I needed to nest them in a **tree-like structure**.

From the get-go, I knew that **recursion** was the way to go. Using `Array.prototype.filter()` and `Array.prototype.map()`, I was able to filter the items based on their `id` and map them to a new object that had a `children` property. This property recursively nested the items based on which ones were children of the current item.

In order to customize my solution, I added two **optional arguments**: `id` and `link`. The former defaults to `null`, indicating that the object is not linked to another one. The latter defaults to `'parentId'`, which is the property that links the object to another one by its `id`.

```js
const nest = (items, id = null, link = 'parentId') =>
  items
    .filter(item => item[link] === id)
    .map(item => ({ ...item, children: nest(items, item.id, link) }));

const comments = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
  { id: 3, parentId: 1 },
  { id: 4, parentId: 2 },
  { id: 5, parentId: 4 }
];
const nestedComments = nest(comments);
/*
[
  {
    id: 1,
    parentId: null,
    children: [
      {
        id: 2,
        parentId: 1,
        children: [
          {
            id: 4,
            parentId: 2,
            children: [
              {
                id: 5,
                parentId: 4,
                children: []
              }
            ]
          }
        ]
      },
      {
        id: 3,
        parentId: 1,
        children: []
      }
    ]
  }
]
*/
```
