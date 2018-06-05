### show

Shows all the elements specified.

Use the spread operator (`...`) and `Array.map()` to clear the `display` property for each element specified.

```js
const show = (...el) => el.map(e => (e.style.display = ''));
```

```js
show(...document.querySelectorAll('img')); // Shows all <img> elements on the page
```
