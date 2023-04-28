---
title: Create HTML element
type: snippet
tags: [browser]
cover: flower-portrait-4
dateModified: 2020-10-19T18:51:03+03:00
---

Creates an element from a string (without appending it to the document).
If the given string contains multiple elements, only the first one will be returned.

- Use `Document.createElement()` to create a new element.
- Use `Element.innerHTML` to set its inner HTML to the string supplied as the argument.
- Use `Element.firstElementChild` to return the element version of the string.

```js
const createElement = str => {
  const el = document.createElement('div');
  el.innerHTML = str;
  return el.firstElementChild;
};
```

```js
const el = createElement(
  `<div class="container">
    <p>Hello!</p>
  </div>`
);
console.log(el.className); // 'container'
```
