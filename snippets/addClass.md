---
title: addClass
tags: browser,beginner
---

Adds a class to an HTML element.

- Use `Element.classList` and `DOMTokenList.add()` to add the specified class to the element.
- Use class name to add CSS style.

```js
const addClass = (el, className) => el.classList.add(className);
```

```js
addClass(document.querySelector('p'), 'special');
// The paragraph will now have the 'special' class
```

```js
.myClassNameExample{
    width: 20%;
    color : blue;
}
```
