---
title: formatSeconds
tags: date,math,string
---

Returns the ISO format of the given number of seconds.

- Divide `s` with the appropriate values to obtain the appropriate values for "HH:mm:ss".
- Use `Array.prototype.map()` to create the string for each value, and pads it to `2` digits.
- Use `String.prototype.join(', ')` to combine the values into a string.

```js
const formatSeconds = s => {
  if (s < 0) s = 0;
  
  return [s / 3600, s / 60 % 60, s % 60]
  	.map(v => `${Math.floor(v).toString().padStart(2, '0')}`)
  	.join(':');
};
```

```js
formatSeconds(-200); // "00:00:00"
formatSeconds(200); // "00:03:20"
formatSeconds(99999); // "27:46:39"
```
