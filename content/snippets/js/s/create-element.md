---
title: Create an HTML element with JavaScript
shortTitle: Create HTML element
language: javascript
tags: [browser]
cover: flower-portrait-4
excerpt: If you want to create an element from a string without appending it to the document, you can use a few lines of JavaScript.
listed: true
dateModified: 2024-07-05
---

DOM manipulation via JavaScript is one of the very reasons the language was created. Oftentimes, you'll want to **create an element from a string** without appending it to the document. This can be useful when you need to create an element in memory before adding it to the DOM.

Luckily, all you need is `Document.createElement()` and `Element.innerHTML` to achieve is. The first method creates a new element, while the second sets its inner HTML to the string you provide. Finally, you can use `Element.firstElementChild` to return the element version of the string.

> [!WARNING]
>
> If the string contains **multiple elements**, only the first one will be returned.

```js
const createElement = str => {
  const el = document.createElement('div');
  el.innerHTML = str;
  return el.firstElementChild;
};

const el = createElement(
  `<div class="container">
    <p>Hello!</p>
  </div>`
);
console.log(el.className);
// 'container'

const other = createElement(
  `<p>Hi!</p> <div>Bye!</div>`
);
console.log(other.tagName);
// 'P' (only the first element is returned)
```

> [!NOTE]
>
> If you want to render entire DOM trees, you might want to look into a more robust solution, such as [rendering DOM elements with JavaScript](/js/s/render-dom-element).
