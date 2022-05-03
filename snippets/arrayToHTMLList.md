---
title: Array to HTML list
tags: browser,array
expertise: intermediate
cover: blog_images/red-succulent.jpg
firstSeen: 2020-10-08T00:02:45+03:00
lastUpdated: 2020-10-20T11:46:23+03:00
---

Converts the given array elements into `<li>` tags and appends them to the list of the given id.

- Use `Array.prototype.map()` and `Document.querySelector()` to create a list of html tags.

```js
const arrayToHTMLList = (arr, listID) =>
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');
```

```js
arrayToHTMLList(['item 1', 'item 2'], 'myListID');
```
