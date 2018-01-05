### off

Removes an event listener from an element.

Use `EventTarget.removeEventListener()` to remove an event listener from an element. Omit the fourth argument `opts` to use `false` or specify it based on the options used when the event listener was added.

```js
const off = (el, evt, fn, opts = false) => el.removeEventListener(evt, fn, opts);
```

```js
// See the `on` snippet.
const fn = () => console.log('!');
const ref = on(document.body, 'click', fn, { target: 'p' });
off(document.body, 'click', ref); // no longer logs '!' upon clicking a `p` el child of the body
```
