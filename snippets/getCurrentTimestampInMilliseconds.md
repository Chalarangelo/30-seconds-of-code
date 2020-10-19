---
title: getCurrentTimestampInMilliseconds
tags: JavaScript,Date,shortcut,intermediate
---

Returns current UNIX timestamp in milliseconds, startting from 1st JAnuary, 1970

- Method needs no input parameter
- Use shorthand notation for getting value from the `Date` constructor
- Use `new Date()` to create a new Date object.

```js
const getCurrentTimestampInMilliseconds = () => +new Date();
```

```js
getCurrentTimestampInMilliseconds(); // '1603134777013'
```
