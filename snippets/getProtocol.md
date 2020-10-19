---
title: getProtocol
tags: browser,beginner
---

Gets the protocol being used on the current page.

- Use `window.location.protocol` to get the protocol (`http:` or `https:`) of the current page.

```js
const getProtocol = () => window.location.protocol;
```

```js
getProtocol(); // 'https:'
```
