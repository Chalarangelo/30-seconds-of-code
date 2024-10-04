---
title: Zebra striped list or table
language: css
tags: [visual]
cover: forest-balcony
excerpt: Use this CSS selector to create a striped list with alternating background colors.
listed: true
dateModified: 2024-09-03
---

Zebra striped **lists** and **tables** are a great way to improve the **readability** of your content. By using the `:nth-child(odd)` or `:nth-child(even)` pseudo-class selectors, you can apply different background colors to elements based on their position in a group of siblings.

> [!TIP]
>
> You can use this trick to apply different styles to **any other elements** that are part of a group of siblings.

https://codepen.io/chalarangelo/pen/VwoLNMR

```css
/* Zebra striped list */
li:nth-child(odd) {
  background-color: #ccc;
}

/* Zebra striped table */
tr:nth-child(even) {
  background-color: #ccc;
}
```
