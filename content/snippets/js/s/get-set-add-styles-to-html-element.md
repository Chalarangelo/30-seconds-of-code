---
title: Get, set or add styles to an HTML element with JavaScript
shortTitle: Get, set or add styles to an HTML element
language: javascript
tags: [browser,css]
cover: frog-blue-flower
excerpt: Learn how to retrieve and manipulate the styles of an HTML element easily and efficiently with JavaScript.
listed: true
dateModified: 2024-02-21
---

Style manipulation is one of the most common tasks when working with the DOM. JavaScript's APIs are quite robust in this regard, allowing you to easily retrieve and manipulate the styles of an HTML element.

## Get the styles of an HTML element

In order to **retrieve the styles** of an HTML element, you can use `Window.getComputedStyle()`. The resulting value is a `CSSStyleDeclaration` object, which contains the styles of the element. Then, all you have to do is **access the desired attributes**.

```js
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];

getStyle(document.querySelector('p'), 'font-size'); // '16px'
```

## Set the styles of an HTML element

Setting the value of a CSS attribute is just as simple, using the `HTMLElement.style` property. Again, you can access the desired attribute and set its value, similar to how you would with an **object**.

```js
const setStyle = (el, rule, val) => (el.style[rule] = val);

setStyle(document.querySelector('p'), 'font-size', '20px');
// The first <p> element on the page will have a font-size of 20px
```

## Add styles to an HTML element

Given that the `HTMLElement.style` property is an object, you can use `Object.assign()` to **merge any given styles object** into the style of the given element. This allows you to add **multiple styles** at once.

```js
const addStyles = (el, styles) => Object.assign(el.style, styles);

addStyles(document.getElementById('my-element'), {
  background: 'red',
  color: '#ffff00',
  fontSize: '3rem'
});
```
