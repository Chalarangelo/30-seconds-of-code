---
title: Scroll progress bar
language: css
tags: [animation,visual]
cover: coworking-space
excerpt: Create a progress bar indicating the scroll percentage of the page, using CSS and JavaScript.
listed: true
dateModified: 2024-09-22
---

Horizontal progress-style scroll bars are a fairly new trend in web design. They are often used in tandem with the traditional vertical scroll bar to provide a visual representation of the user's progress through the page. So how does one go about implementing this feature?

As far as CSS is concerned, there's very little work to be done. The progress bar itself is just a simple `div` element with a fixed position at the top of the page.

The magic happens in the JavaScript, where we use `EventTarget.addEventListener()` to listen for the `scroll` event. Then, we use the `Element.scrollTop` property to determine the **scroll percentage of the document** and apply it to the `width` of the progress bar.

https://codepen.io/chalarangelo/pen/gOVrBVM

```css
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
