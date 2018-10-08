### insertBefore

Inserts an HTML string before the start of the specified element.

Use `el.insertAdjacentHTML()` with a position of `'beforebegin'` to parse `htmlString` and insert it before the start of `el`.

```js
const insertBefore = (el, htmlString) => el.insertAdjacentHTML('beforebegin', htmlString);
```

```js
insertBefore(document.getElementById('myId'), '<p>before</p>'); // <p>before</p> <div id="myId">...</div>
```
