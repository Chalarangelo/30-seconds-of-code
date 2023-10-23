---
title: Show or hide HTML elements with JavaScript
shortTitle: Show or hide HTML elements
type: story
language: javascript
tags: [browser,css]
cover: picking-berries
excerpt: Ever wanted to show or hide one or more elements in HTML, using JavaScript? Turns out it's very easy to do so.
dateModified: 2023-10-22
---

JavaScript allows you to **change the CSS properties of an element** by accessing its [`style` property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style). This way, you can show or hide HTML elements by changing their [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display) property.

Combining this technique with the spread operator (`...`) and `Array.prototype.forEach()` allows you to **show or hide multiple elements at once**.

### Hide HTML elements

In order to hide an HTML element, you can use the `display: none` CSS property. This will remove the element from the page layout, but it will still be present in the DOM.

```js
const hide = (...el) => [...el].forEach(e => (e.style.display = 'none'));

hide(...document.querySelectorAll('img'));
// Hides all <img> elements on the page
```

### Show HTML elements

Most HTML elements have a default `display` property value. For example, the default value for `<div>` elements is `block`, while the default value for `<span>` elements is `inline`. In order to show an element, you can set its `display` property to its default value, or to an empty string (`''`).

```js
const show = (...el) => [...el].forEach(e => (e.style.display = ''));

show(...document.querySelectorAll('img'));
// Shows all <img> elements on the page
```
