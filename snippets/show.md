---
title: Show elements
tags: browser,css
cover: blog_images/green-plant.jpg
firstSeen: 2017-12-28T23:33:21+02:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Shows all the elements specified.

- Use the spread operator (`...`) and `Array.prototype.forEach()` to clear the `display` property for each element specified.

```js
const show = (...el) => [...el].forEach(e => (e.style.display = ''));
```

```js
show(...document.querySelectorAll('img'));
// Shows all <img> elements on the page
```
