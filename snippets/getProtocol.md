---
title: Current page protocol
tags: browser
cover: blog_images/bamboo-lamp.jpg
firstSeen: 2020-10-07T01:40:53+03:00
lastUpdated: 2020-10-20T11:46:23+03:00
---

Gets the protocol being used on the current page.

- Use `Window.location.protocol` to get the protocol (`http:` or `https:`) of the current page.

```js
const getProtocol = () => window.location.protocol;
```

```js
getProtocol(); // 'https:'
```
