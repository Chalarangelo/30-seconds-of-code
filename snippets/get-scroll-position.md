## Get Scroll Position

Get the current distance scrolled by `window` or `HTMLElement` as an {x,y} object

```js
const getScrollPos = (scroller = window) => {
  let x = (scroller.pageXOffset !== undefined) ? scroller.pageXOffset : scroller.scrollLeft;
  let y = (scroller.pageYOffset !== undefined) ? scroller.pageYOffset : scroller.scrollTop;

  return {x, y}
}

// getScrollPos() -> {x: number, y: number}
```