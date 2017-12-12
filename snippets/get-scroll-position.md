## Get scroll position

Use `pageXOffset` and `pageYOffset` if they are defined, otherwise `scrollLeft` and `scrollTop`.
You can omit `el` to use a default value of `window`.

```js
const getScrollPos = (el = window) =>
  ( {x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft,
   y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop} );
// getScrollPos() -> {x: 0, y: 200}
```
