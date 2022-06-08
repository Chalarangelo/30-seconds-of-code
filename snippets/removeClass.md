---
title: Remove class from HTML element
tags: browser
expertise: beginner
author: chalarangelo
cover: blog_images/bag-waiting.jpg
firstSeen: 2020-12-30T19:21:15+02:00
lastUpdated: 2020-12-30T19:21:15+02:00
---

Removes a class from an HTML element.

- Use `Element.classList` and `DOMTokenList.remove()` to remove the specified class from the element.

```js
const removeClass = (el, className) => el.classList.remove(className);
```

```js
removeClass(document.querySelector('p.special'), 'special');
// The paragraph will not have the 'special' class anymore
```
