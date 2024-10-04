---
title: Navigation list item hover & focus effect
language: css
tags: [visual]
cover: cloudy-rock-formation
excerpt: Create a custom hover and focus effect for navigation items, using CSS transformations.
listed: true
dateModified: 2024-09-19
---

Creating a custom hover and focus effect for navigation items is a fairly straightforward task, leveraging the power of **CSS transformations**.

For each element in your navigation list, you can use the `::before` pseudo-element to create a hover effect. By default, you can hide it using `transform: scale(0)`. Then, using the `:hover` and `:focus` pseudo-class selectors, you can transition the pseudo-element to `transform: scale(1)` and show its colored background.

Finally, prevent the pseudo-element from covering the anchor element using `z-index`.

```css
li a {
  position: relative;
  display: block;
  z-index: 0;
}

li a::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  background-color: #2683f6;
  z-index: -1;
  transform: scale(0);
  transition: transform 0.5s ease-in-out;
}

li a:hover::before,
li a:focus::before {
  transform: scale(1);
}
```
