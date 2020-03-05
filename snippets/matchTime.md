---
title: matchTime
tags: javascript,regexp,utility,advanced
---

Matches 24 hour time format.

This function checks if theres any character/number in the given string that refers to time. It takes string as an argument and
uses `regexp` to find if theres any pattern in the string that indicates to time.

```js
const matchTime = str =>
  str.match(/([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?/g);
```

```js
matchTime("Hello world! Right now the time is 2:30pm"); // [ '2:30' ]
matchTime("Meet me in the subway at 10:30, operation starts at 12:00"); // [ '10:30', '12:00' ]
```
