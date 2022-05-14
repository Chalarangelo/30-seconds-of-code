---
title: Repeat generator
tags: function,generator
expertise: advanced
author: chalarangelo
cover: blog_images/white-flower.jpg
firstSeen: 2020-10-11T17:05:48+03:00
lastUpdated: 2020-10-11T17:05:48+03:00
---

Creates a generator, repeating the given value indefinitely.

- Use a non-terminating `while` loop, that will `yield` a value every time `Generator.prototype.next()` is called.
- Use the return value of the `yield` statement to update the returned value if the passed value is not `undefined`.

```js
const repeatGenerator = function* (val) {
  let v = val;
  while (true) {
    let newV = yield v;
    if (newV !== undefined) v = newV;
  }
};
```

```js
const repeater = repeatGenerator(5);
repeater.next(); // { value: 5, done: false }
repeater.next(); // { value: 5, done: false }
repeater.next(4); // { value: 4, done: false }
repeater.next(); // { value: 4, done: false }
```
