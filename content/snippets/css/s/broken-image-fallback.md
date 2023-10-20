---
title: Fallback for images that fail to load
type: snippet
shortTitle: Broken image fallback
language: css
tags: [visual]
cover: building-facade
dateModified: 2022-11-04
---

Displays an error message when an image fails to load.

- Apply styles to the `img` element as if it was a text container.
- Use the `::before` and `::after` pseudo-elements to display an error message and the image URL. These elements will only be displayed if the image fails to load.

```html
<img src="https://nowhere.to.be/found.jpg" />
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
