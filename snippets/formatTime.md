---
title: formatTime
tags: date,math,string,beginner
---

Returns a duration (in seconds) in human-readable 24-hour format `hh:mm:ss`.

- Calculate hours, minutes and seconds portions of the total seconds.
- Use `Array.prototype.map()` to format each of the parts.
- Use `Math.floor()` to floor numbers to their integer values.
- Use `Number.prototype.toString()` to convert the numbers into strings.
- Use `String.prototype.padStart(2, '0')` to pad the strings with leading zeros until they have a length of 2.
- Use `Array.prototype.join(':')` to join all array elements into a single string, with a colon between them.

```js
const formatTime = totalSeconds => {
  const hours = (totalSeconds % 86400) / 3600;
  const minutes = (totalSeconds % 3600) / 60;
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map(n => Math.floor(n).toString().padStart(2, '0'))
    .join(':');
};
```

```js
formatTime(0);     // 00:00:00
formatTime(5445);  // 01:30:45
formatTime(86399); // 23:59:59
```
