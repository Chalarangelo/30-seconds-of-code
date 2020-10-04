---
title: searchLocal
tags: array, function, logic, beginner
---

Returns the local search on an array.

- The search argument passed as a parameter, if included in any element of the array, returns the elements that satisfy the condition.
- The condition ignores uppercase or lowercase letters.
- Use the javascript filter function that returns an element when the condition is TRUE.

```js
const array = ["Hello Word", "filter", "Search", "fiber"];

const searchLocal = (element) => {
  const newList = array.filter((el) =>
    el.name.toLowerCase().includes(element.toLowerCase())
  );

  return newList;
};
```

```js
searchLocal("word"); // ["Hello Word"]
searchLocal("fi"); // ["filter", "fiber"]
```
