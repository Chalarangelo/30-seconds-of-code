---
title: Gradient text
language: css
tags: [visual]
cover: red-berries
excerpt: Modern CSS can help you create gradient text with a few lines of code. Learn how today!
listed: true
dateModified: 2024-09-10
---

I remember a time when gradients were tricky to use for backgrounds, let alone for styling text. But, with modern CSS, it's pretty easy to create gradient text with only a few lines of code, at least on WebKit browsers (Chrome, Edge, Safari).

Styling text with gradients starts the same as creating a **gradient for the background**. You use the `linear-gradient()` function to define the gradient colors and direction.

Then, you have to **apply it to the text** using the `-webkit-text-fill-color` property with a value of `transparent`. Finally, **clip the background with the text** using the `background-clip` property with a value of `text` and you're done!

```css
.gradient-text {
  background: linear-gradient(to right, #009FFF, #ec2F4B);
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
}
```

https://codepen.io/chalarangelo/pen/gOVrreP
