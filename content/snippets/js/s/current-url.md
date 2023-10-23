---
title: How can I get the current URL in JavaScript?
shortTitle: Current URL
type: question
language: javascript
tags: [browser]
cover: purple-sunset-waves
excerpt: Learn a simple way to get the browser's current URL in JavaScript.
dateModified: 2023-10-19
---

As mentioned in the [Window.location Cheat Sheet](/js/s/window-location-cheatsheet), JavaScript provides a number of properties and methods to work with the current URL. Among those, [`Window.location.href`](/js/s/window-location-cheatsheet/#window-location-href) provides the easiest way to get the **current URL as a string**.

```js
const currentURL = () => window.location.href;
```

```js
currentURL(); // 'https://www.google.com/'
```
