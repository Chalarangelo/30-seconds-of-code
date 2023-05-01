---
title: Check if browser tab is focused
type: snippet
tags: [browser]
cover: overgrown
dateModified: 2020-10-20T23:02:01+03:00
---

Checks if the browser tab of the page is focused.

- Use the `Document.hidden` property, introduced by the [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) to check if the browser tab of the page is visible or hidden.

```js
const isBrowserTabFocused = () => !document.hidden;
```

```js
isBrowserTabFocused(); // true
```
