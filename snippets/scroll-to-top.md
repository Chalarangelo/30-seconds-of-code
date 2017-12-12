### Scroll to top

Get distance from top using `document.documentElement.scrollTop` or `document.body.scrollTop`.
Scroll by a fraction of the distance from top. Use `window.requestAnimationFrame()` to animate the scrolling.

```js
const scrollToTop = _ => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if(c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c/8);
  }
}
// scrollToTop()
```
