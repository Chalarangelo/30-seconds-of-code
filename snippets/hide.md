### hide

Hides all the elements specified.

Use `NodeList.prototype.forEach()` to apply `display: none` to each element specified.

```js
const hide = els => els.forEach(e => e.style.display = 'none');
```

```js
hide(document.querySelectorAll('img')); // Hides all <img> elements on the page
```
