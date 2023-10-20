---
title: Scroll progress bar
type: snippet
language: css
tags: [animation,visual]
cover: coworking-space
dateModified: 2021-10-13
---

Creates a progress bar indicating the scroll percentage of the page.

- Use `position: fixed` and a large `z-index` value to place the element at the top of the page and above any content.
- Use `EventTarget.addEventListener()` and `Element.scrollTop` to determine the scroll percentage of the document and apply it to the `width` of the element.

```html
<div id="scroll-progress"></div>
```

```css
body {
  min-height: 200vh;
}

#scroll-progress {
  position: fixed;
  top: 0;
  width: 0%;
  height: 4px;
  background: #7983ff;
  z-index: 10000;
}
```

```js
const scrollProgress = document.getElementById('scroll-progress');
const height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener('scroll', () => {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
});
```
