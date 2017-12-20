### arrayToHtmlList

Converts the given array elements into 'li' tags and appends them to the list of the given id.


```js
const arrayToHtmlList = (arr, listID) => arr.map(item => document.querySelector("#"+listID).innerHTML+=`<li>${item}</li>`);

```

