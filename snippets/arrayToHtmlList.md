### arrayToHtmlList

Converts the given array elements into `<li>` tags and appends them to the list of the given id.

Use `Array.map()` , `document.querySelector()` and an anonymous inner closure that is self executed to declare a variable in a local context to create a list of html tags.

```js
 const arrayToHtmlList = (arr, listID) =>
  (el => (el = document.querySelector('#' + listID), 
    el.innerHTML += arr.map(item => `<li>${item}</li>`).join('')))()
```

```js
arrayToHtmlList(['item 1', 'item 2'], 'myListID');
```
