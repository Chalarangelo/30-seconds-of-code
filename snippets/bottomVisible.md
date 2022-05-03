---
title: Check if bottom of page is visible
tags: browser
expertise: beginner
cover: blog_images/red-mountain.jpg
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-22T20:23:47+03:00
---

Checks if the bottom of the page is visible.

- Use `Window.scrollY`, `Element.scrollHeight` and `Element.clientHeight` to determine if the bottom of the page is visible.

```js
const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);
```

```js
bottomVisible(); // true
```
