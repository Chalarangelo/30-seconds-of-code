### Bottom visible

Returns `true` if bottom of the page is visible. It adds `scrollY` to
the height of the visible portion of the page (`clientHeight`) and
compares it to `pageHeight` to see if bottom of the page is visible.

```js
const bottomVisible = () => {
  const scrollY = window.scrollY;
  const visibleHeight = document.documentElement.clientHeight;
  const pageHeight = document.documentElement.scrollHeight;
  const bottomOfPage = visibleHeight + scrollY >= pageHeight;

  return bottomOfPage || pageHeight < visibleHeight;
}
```
