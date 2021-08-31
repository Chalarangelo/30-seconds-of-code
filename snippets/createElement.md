---
title: createElement
tags: browser,beginner
firstSeen: 2018-01-05T18:21:44+02:00
lastUpdated: 2020-10-19T18:51:03+03:00
---

Creates an element from a string (without appending it to the document).
If the given string contains multiple elements, only the first one will be returned.

- Use `Document.createElement()` to create a new element.
- Use `Element.innerHTML` to set its inner HTML to the string supplied as the argument.
- Use `ParentNode.firstElementChild` to return the element version of the string.

```js
const createElement = str => {
  const element = document.createElement('div');
  element.innerHTML = str;
  return element.firstElementChild;
};
```

```js
const element = createElement(
  `<div class="container">
    <p>Hello!</p>
  </div>`
);
console.log(element.className); // 'container'
```
