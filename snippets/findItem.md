---
title: findItem
tags: array,recursion,menu,tree
---

Returns an item which satisfies the provided testing function in array.

- Use recursion.
- Use `Array.prototype.forEach()` to check each item and test each key-value pair using `fn`.
- Need to provide a **childKey** such as `'subs'` to be third parameters in order to use recursion.
- Create a **closure** to save the result value.

```js
const findItem = (...args) => {
  let res;
  const recursion = (arr, fn, childKey) => {
    arr.forEach(item => {
      if(fn(item)) { r = item ; return }
      if(item[childKey] && item[childKey].length > 0){
        recursion(item[childKey], fn, childKey)
      }
    })
  }
  recursion(...args)
  return res
}
```

```js
findItem([
  { id: 1, name: 'Tom', subs: [{ id: 11, name: 'Jack', subs: [] }, { id: 12, name: 'Peter', subs: [] }] },
  { id: 2, name: 'John', subs: [{ id: 21, name: 'Lily', subs: [] }] },
  { id: 3, name: 'July', subs: [] },
  { id: 4, name: 'Frank' },
], x => x.id === 12, 'subs')
// { id: 12, name: 'Peter', subs: [] }
```
