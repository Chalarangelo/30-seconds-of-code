---
title: Number of seconds to ISO format
tags: date,math,string
cover: blog_images/rocky-mountains.jpg
firstSeen: 2021-05-09T12:44:55+03:00
lastUpdated: 2021-10-13T19:29:39+02:00
---

Returns the ISO format of the given number of seconds.

- Divide `s` with the appropriate values to obtain the appropriate values for `hour`, `minute` and `second`.
- Store the `sign` in a variable to prepend it to the result.
- Use `Array.prototype.map()` in combination with `Math.floor()` and `String.prototype.padStart()` to stringify and format each segment.
- Use `Array.prototype.join()` to combine the values into a string.

```js
const formatSeconds = s => {
  const [hour, minute, second, sign] =
    s > 0
      ? [s / 3600, (s / 60) % 60, s % 60, '']
      : [-s / 3600, (-s / 60) % 60, -s % 60, '-'];

  return (
    sign +
    [hour, minute, second]
      .map(v => `${Math.floor(v)}`.padStart(2, '0'))
      .join(':')
  );
};
```

```js
formatSeconds(200); // '00:03:20'
formatSeconds(-200); // '-00:03:20'
formatSeconds(99999); // '27:46:39'
```
