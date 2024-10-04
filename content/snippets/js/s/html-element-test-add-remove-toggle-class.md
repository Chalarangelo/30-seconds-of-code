---
title: HTML element class manipulation with JavaScript
shortTitle: Check or toggle HTML element class
language: javascript
tags: [browser]
cover:  bag-waiting
excerpt: Learn how to work with HTML element classes in JavaScript, from simple class checks to adding, removing and toggling classes.
listed: true
dateModified: 2024-01-21
---

Working with HTML elements in the browser often involves around **manipulating their classes**. In order to do so, you might need a handful of utilities, such as checking if an element has a class, adding, removing or toggling a class.

## Check if HTML element has a class

To **check if an HTML element has a class**, you can use the `Element.classList` property and the `DOMTokenList.contains()` method.

```js
const hasClass = (el, className) => el.classList.contains(className);

hasClass(document.querySelector('p.special'), 'special'); // true
```

## Add a class to HTML element

To **add a class to an HTML element**, you can use the `Element.classList` property and the `DOMTokenList.add()` method.

```js
const addClass = (el, className) => el.classList.add(className);

addClass(document.querySelector('p'), 'special');
// The paragraph will now have the 'special' class
```

## Remove a class from HTML element

Similarly, **removing a class from an HTML element** can be done the same way, but using the `DOMTokenList.remove()` method, instead.

```js
const removeClass = (el, className) => el.classList.remove(className);

removeClass(document.querySelector('p.special'), 'special');
// The paragraph will not have the 'special' class anymore
```

## Toggle a class for HTML element

Finally, if you only need to **switch a class on and off**, you can use the `DOMTokenList.toggle()` method.

```js
const toggleClass = (el, className) => el.classList.toggle(className);

toggleClass(document.querySelector('p.special'), 'special');
// The paragraph will not have the 'special' class anymore
```
