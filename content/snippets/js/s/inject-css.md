---
title: How can I inject CSS into a web page using JavaScript?
shortTitle: Inject CSS
language: javascript
tags: [browser,css]
cover: dark-leaves-5
excerpt: Injecting CSS into a page via JavaScript is pretty easy, if you know how to leverage the DOM.
listed: true
dateModified: 2024-02-09
---

I've often found myself in need of dynamically modifying CSS on a web page. While it's very easy to alter the styles of individual elements, using `Element.style`, it's not as easy to inject a whole new set of styles into the page. Being able to do so comes particularly handy when working with CSS variables.

Thinking a little outside the box, we might consider **how we usually write CSS** - in a `<style>` tag. This is exactly what we'll be doing in order to inject some new CSS into the page.

Using `Document.createElement()`, we can create a new `style` element and set its type to `text/css`. We can then set its `innerText` to the CSS string we want to inject. Finally, we can use `Document.head` and `Node.appendChild()` to **append the new element** to the document head.

Doing so will make the browser parse the CSS and apply it to the page. The newly created `style` element will be returned, in case you need to keep a **reference** to it.

```js
const injectCSS = css => {
  let el = document.createElement('style');
  el.type = 'text/css';
  el.innerText = css;
  document.head.appendChild(el);
  return el;
};

injectCSS('body { background-color: #000 }');
// '<style type="text/css">body { background-color: #000 }</style>'
```
