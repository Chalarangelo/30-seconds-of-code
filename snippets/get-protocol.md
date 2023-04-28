---
title: Current page protocol
type: snippet
tags: [browser]
cover: bamboo-lamp
dateModified: 2020-10-20T11:46:23+03:00
---

Gets the protocol being used on the current page.

- Use `Window.location.protocol` to get the protocol (`http:` or `https:`) of the current page.

```js
const getProtocol = () => window.location.protocol;
```

```js
getProtocol(); // 'https:'
```
