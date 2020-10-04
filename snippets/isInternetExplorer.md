---
title: isInternetExplorer
tags: browser,intermediate
---

Checks whether the website is Internet Explorer (<= 11).

- Use a regular expression to test the `window.navigator.userAgent` property in order to detect IE browsers.
- IE 11 contains 'Trident' in its User-Agent. Older versions include 'MSIE' in its User-Agent.

```js
const isInternetExplorer = () => /Trident|MSIE/.test(window.navigator.userAgent);
```

```js
isInternetExplorer(); // true if user is using any IE version, false otherwise
```
