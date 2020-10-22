---
title: bottomVisible
tags: browser,beginner
---

Checks if the bottom of the page is visible.

- Use `scrollY`, `scrollHeight` and `clientHeight` to determine if the bottom of the page is visible.

```js
const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);
```

```js
bottomVisible(); // true
```
