### off

Removes an event listener from an element.

Use `EventTarget.removeEventListener()` to remove an event listener from an element.

```js
const off = (el, evt, fn, opts = false) => el.removeEventListener(evt, fn, opts);
```

```js
// See the `on` snippet.
const fn = () => console.log('!');
const ref = on(document.body, 'click', fn, { target: 'p' });
off(document.body, 'click', ref); // no longer logs '!' upon clicking a `p` el child of the body
```
