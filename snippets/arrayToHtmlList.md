---
title: arrayToHtmlList
tags: browser,array,intermediate
---

Converts the given array elements into `<li>` tags and appends them to the list of the given id.

Use `Array.prototype.map()` and `document.querySelector()` to create a list of html tags.

```js
const arrayToHtmlList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');
```

```js
arrayToHtmlList(['item 1', 'item 2'], 'myListID');
```
