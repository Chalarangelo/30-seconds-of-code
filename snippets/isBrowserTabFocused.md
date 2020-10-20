---
title: isBrowserTabFocused
tags: browser,beginner
---

Checks if the browser tab of the page is focused.

- Use the `Document.hidden` property, introduced by the [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) to check if the browser tab of the page is visible or hidden.

```js
const isBrowserTabFocused = () => !document.hidden;
```

```js
isBrowserTabFocused(); // true
```
