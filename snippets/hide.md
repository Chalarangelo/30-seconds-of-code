### hide

Hides all the elements specified.

Use the spread operator (`...`) and `Array.forEach()` to apply `display: none` to each element specified.

```js
const hide = (...el) => [...el].forEach(e => e.style.display = 'none');
```

```js
hide(document.querySelector('img')); // Hides all <img> elements on the page
```
