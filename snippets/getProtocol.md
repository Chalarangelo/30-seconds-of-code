---
title: getProtocol
tags: browser,beginner
---

Returns the protocol being used on the current page.

- Can be either `http:` or `https:`

```js
const getProtocol = () => window.location.protocol;
```

```js
getProtocol(); // 'https:'
```
