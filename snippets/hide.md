### hide

Hides all the elements specified.

Use the spread operator (`...`) and `Array.map()` to apply `display: none` to each element specified.

```js
const hide = (...el) => el.map(e => (e.style.display = 'none'));
```

```js
hide(...document.querySelectorAll('img')); // Hides all <img> elements on the page
```
