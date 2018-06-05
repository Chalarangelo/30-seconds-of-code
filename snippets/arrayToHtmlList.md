### arrayToHtmlList

Converts the given array elements into `<li>` tags and appends them to the list of the given id.

Use `Array.map()` and `document.getElementById(id)` to create a list of html tags.

```js
const arrayToHtmlList = (arr, listID) => (
  el = document.getElementById(listID),
  arr.map(item => el.innerHTML += `<li>${item}</li>`))
```

```js
arrayToHtmlList(['item 1', 'item 2'], 'myListID');
```
