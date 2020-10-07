---
title: sleepSync
tags: function,intermediate
---

Delays the execution of a synchronous function.

- Gets the current time, and works out the expire time based on the input
- Loops until the current time is greater than the expire time

```js
let sleepSync = milliseconds => {
  const start = new Date().getTime(), expire = start + milliseconds;
  while (new Date().getTime() < expire) { }
}
```

```js
const sleepyWork = () => {
  console.log(`I'm going to sleep for 1 second.`);
  sleepSync(1000);
  console.log('I woke up after 1 second.');
}```
