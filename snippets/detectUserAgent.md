---
title: detectUserAgent
tags: browser,function,beginner
---

Returns the string value of the user-agent header sent by the browser to the server.

- Use `detectUserAgent()` to get the information about the name, version and platform of the browser.

```js
const detectUserAgent = () => window.navigator.userAgent;
```

```js
detectUserAgent(); // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
```
