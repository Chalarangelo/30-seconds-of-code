---
title: Drop caps with pure CSS
shortTitle: Drop caps
language: css
tags: [visual]
cover: bamboo-lamp
excerpt: Style the first letter of the first paragraph in your text, using a simple CSS selector,
listed: true
dateModified: 2024-08-23
---

The `::first-letter` CSS pseudo-element is used to style the **first letter of the first line** of a block-level element. This is often used to create a drop cap effect, where the first letter is larger than the rest of the text.

Most drop cap effects are only applied to the **first paragraph**, so you'll need to combine the previous selector with the `:first-child` pseudo-class to achieve this effect.

https://codepen.io/chalarangelo/pen/oNrKNWK

Then, you can style the first letter of the first paragraph using the `::first-letter` pseudo-element. More often than not, you'll want to alter its `font-size`, `font-weight`, `line-height`, and `color`. Additionally, to make it look more like a drop cap, you can `float` it to the left and add some `margin`.

```css
p:first-child::first-letter {
  color: #5f79ff;
  float: left;
  margin: 0 8px 0 4px;
  font-size: 3rem;
  font-weight: bold;
  line-height: 1;
}
```
