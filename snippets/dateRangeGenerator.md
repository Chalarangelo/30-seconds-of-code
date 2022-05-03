---
title: Date range generator
tags: date,function,generator
expertise: advanced
author: maciv
cover: blog_images/portal-timelapse.jpg
firstSeen: 2021-06-21T05:00:00-04:00
---

Creates a generator, that generates all dates in the given range using the given step.

- Use a `while` loop to iterate from `start` to `end`, using `yield` to return each date in the range, using the `Date` constructor.
- Use `Date.prototype.getDate()` and `Date.prototype.setDate()` to increment by `step` days after returning each subsequent value.
- Omit the third argument, `step`, to use a default value of `1`.

```js
const dateRangeGenerator = function* (start, end, step = 1) {
  let d = start;
  while (d < end) {
    yield new Date(d);
    d.setDate(d.getDate() + step);
  }
};
```

```js
[...dateRangeGenerator(new Date('2021-06-01'), new Date('2021-06-04'))];
// [ 2021-06-01, 2021-06-02, 2021-06-03 ]
```
