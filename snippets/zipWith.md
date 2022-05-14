---
title: Group array elements based on function
tags: array
expertise: advanced
cover: blog_images/switzerland-night.jpg
firstSeen: 2018-01-20T17:21:34+02:00
lastUpdated: 2020-11-03T21:46:13+02:00
---

Creates an array of elements, grouped based on the position in the original arrays and using a function to specify how grouped values should be combined.

- Check if the last argument provided is a function.
- Use `Math.max()` to get the longest array in the arguments.
- Use `Array.from()` to create an array with appropriate length and a mapping function to create array of grouped elements.
- If lengths of the argument arrays vary, `undefined` is used where no value could be found.
- The function is invoked with the elements of each group.

```js
const zipWith = (...array) => {
  const fn =
    typeof array[array.length - 1] === 'function' ? array.pop() : undefined;
  return Array.from({ length: Math.max(...array.map(a => a.length)) }, (_, i) =>
    fn ? fn(...array.map(a => a[i])) : array.map(a => a[i])
  );
};
```

```js
zipWith([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c); // [111, 222]
zipWith(
  [1, 2, 3],
  [10, 20],
  [100, 200],
  (a, b, c) =>
    (a != null ? a : 'a') + (b != null ? b : 'b') + (c != null ? c : 'c')
); // [111, 222, '3bc']
```
