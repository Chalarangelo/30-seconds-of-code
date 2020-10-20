---
title: injectCSS
tags: browser,css,intermediate
---

Injects the given css code into the current document

- Use `Document.createElement()` to create a new `style` element and set its type to `text/css`.
- Use `Element.innerText` to set the value to the given css string, `Document.head` and `Element.appendChild()` to append the new element to the document head.
- Return the newly created `style` element.

```js
const injectCSS = css => {
  let el = document.createElement('style');
  el.type = 'text/css';
  el.innerText = css;
  document.head.appendChild(el);
  return el;
}
```

```js
injectCSS('body { background-color: #000 }'); // '<style type="text/css">body { background-color: #000 }</style>'
```
