---
title: Display a fallback for images that fail to load
shortTitle: Broken image fallback
language: css
tags: [visual]
cover: building-facade
excerpt: Having trouble loading an image? Display a fallback message instead!
listed: true
dateModified: 2024-09-09
---

Ever wanted to display a message when an image fails to load? Perhaps you want to show the image's URL or a custom error message. Luckily, there's an easy way to do so.

The key to this technique lies in the way we handle the `<img>` element. Instead of treating it as an image container, we'll **treat it as a text container**. This allows us to apply styles and pseudo-elements to it, which will only be displayed when the image fails to load.

Using the `::before` and `::after` pseudo-elements, we can display an error message and the image's URL. This way, users will know what went wrong and where the image was supposed to be.

The best part? This fallback message is **only displayed when the image fails to load**, so it won't interfere with the image itself.

```html
<img src="/nowhere/to/be/found.jpg" />
```

```css
img {
  display: block;
  font-family: sans-serif;
  font-weight: 300;
  height: auto;
  line-height: 2;
  position: relative;
  text-align: center;
  width: 100%;
}

img::before {
  content: "Sorry, this image is unavailable.";
  display: block;
  margin-bottom: 8px;
}

img::after {
  content: "(url: " attr(src) ")";
  display: block;
  font-size: 12px;
}
```

https://codepen.io/chalarangelo/pen/yLmOeVN

> [!NOTE]
>
> This fallback may require **additional accessibility considerations**. Make sure to test it with a screen reader to ensure it's accessible to all users. Also, always provide a meaningful `alt` attribute for your images to help users understand their content.
