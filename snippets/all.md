---
title: all
tags: array,function,beginner
---

Returns `true` if the provided predicate function returns `true` for all elements in a collection, `false` otherwise.

- Use `Array.prototype.every()` to test if all elements in the collection return `true` based on `fn`.
- Omit the second argument, `fn`, to use `Boolean` as a default.

## every method usage-
````
const people = [
      { name: 'Wes', year: 1988 },
      { name: 'Kait', year: 1986 },
      { name: 'Irv', year: 1970 },
      { name: 'Lux', year: 2015 }
    ];
Is everyone 19 years old?
const allAged = people.every(person => ((new Date()).getFullYear())- person.year >= 19);
    console.log({allAged}); output-> {allAged: false}
```

### Another example
```js
const all = (arr, fn = Boolean) => arr.every(fn);
```

```js
all([4, 2, 3], x => x > 1); // true
all([1, 2, 3]); // true
```
