---
title: sanitizeString
tags: string,intermediate
firstSeen: 2021-08-28T012:00:00-04:00
---
Sanitize the string by removing the special characters from the string

- uses regex and `replace` function of the string.
- uses `trim` function to remove the white spaces.

```js
const sanitizeString=str=> str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"").trim();
```

```js
sanitizeString("Hello=>('') Worl|}"); // 'Hello Worl'
```
