---
title: Fade out siblings on hover
shortTitle: Sibling fade
language: css
tags: [interactivity]
cover: messy-papers
excerpt: Create a cool effect that fades out the siblings of a hovered item with a few lines of CSS.
listed: true
dateModified: 2024-08-28
---

A classic hove effect is to fade out the siblings of an item when it is hovered. This can be achieved with a few lines of CSS by using the `:hover` and `:not()` pseudo-class selectors.

Simply put, when the mouse is over an element, all its siblings will have their `opacity` set to `0.5`, while the hovered element will remain at `1`. Adding a `transition` to the `opacity` property will create a smooth animation effect.

Using the `:hover` selector, we can target the **parent of the hovered element** and change the `opacity` of all its children except the one being hovered. This technique works because the `:hover` selector is applied to the parent element, as well as the child element.

Alternatively, we can use the new `:has()` pseudo-class in combination with `:hover` to achieve the same effect. The `:has()` pseudo-class allows us to select an element based on whether it has a **descendant that matches** a specific selector.

```css
.element {
  transition: opacity 0.3s;
}

/* Using the :hover and :not() pseudo-class selectors */
.container:hover .element:not(:hover) {
  opacity: 0.5;
}

/* Or using the :has() pseudo-class */
.container:has(.element:hover) .element:not(:hover) {
  opacity: 0.5;
}
```

https://codepen.io/chalarangelo/pen/wvVamWR
