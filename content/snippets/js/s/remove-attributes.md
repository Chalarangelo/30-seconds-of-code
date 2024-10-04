---
title: Remove attributes from an HTML element with JavaScript
shortTitle: Remove attributes
language: javascript
tags: [browser]
cover: new-york
excerpt: A simple trick to remove one or more attributes from an HTML element.
listed: true
dateModified: 2023-10-21
---

Any attribute of an HTML element can be removed, using the `Element.removeAttribute()` method. This allows you to specify an attribute name, and remove it from the element.

```js
document.querySelector('img').removeAttribute('src');
// Removes the 'src' attribute from the <img> element
```

But what if you want to **remove all attributes** from an HTML element? `Element.attributes` is a property that contains a list of all the attributes of an element.

In order to enumerate an element's attributes, `Object.values()` can be used. The array of attributes can then be iterated using `Array.prototype.forEach()` to remove each one from the element.

```js
const removeAttributes = element =>
  Object.values(element.attributes).forEach(({ name }) =>
    element.removeAttribute(name)
  );

removeAttributes(document.querySelector('p.special'));
// The paragraph will not have the 'special' class anymore,
//  and all other attributes will be removed
```
