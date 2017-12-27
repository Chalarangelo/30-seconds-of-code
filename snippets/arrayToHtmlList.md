### arrayToHtmlList

Converts the given array elements into `<li>` tags and appends them to the list of the given id.

Use `Array.map()` and `document.querySelector()` to create a list of html tags.

```js
const arrayToHtmlList = (arr, listID) => arr.map(item => document.querySelector('#' + listID).innerHTML += `<li>${item}</li>`);
// arrayToHtmlList(['item 1', 'item 2'],'myListID')
```
