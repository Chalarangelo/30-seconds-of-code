---
title: Select the focused DOM element with JavaScript
shortTitle: Focused DOM element
type: tip
language: javascript
tags: [browser]
cover: horse-sunset
excerpt: Here's a quick and easy way to select the currently focused DOM element in JavaScript.
dateModified: 2022-10-23
---

Finding the currently focused DOM element is trivial in modern CSS, using the `:focus` selector. You can also use it in JavaScript, in combination with `Document.querySelector()` to find the focused element. Yet, there's an even easier way to get the currently focused element in JavaScript, using the `Document.activeElement` property.

```js
const focusedElement = document.activeElement;
// `focusedElement` is the currently focused element
```

Note that focusable elements vary depending on browser and operating system. Additionally, you should remember that focus and selection (i.e. content highlighting) are not the same thing.
