---
title: Card with image cutout
language: css
tags: [visual]
cover: radio-monstera
excerpt: Cutout effects seem tricky to implement, but they really aren't. CSS has you covered!
listed: true
dateModified: 2024-09-13
---

Cutout effects are a great way to add visual interest to your website. They can be used to create unique layouts, highlight important content, or simply make your website more visually appealing. One common way to create a cutout effect is to use an image cutout, where an image is displayed inside a container with a cutout shape.

To create this effect, you'll need a **container element** with a colored `background` and a **card element** containing the image you want to display. You can then use the `::before` pseudo-element to add a `border` around the image, matching the container element's `background` and creating the illusion of a cutout in the card.

https://codepen.io/chalarangelo/pen/ZEgWBRo

```html
<div class="container">
  <div class="card">
    <figure>
      <img src="/path/to/img.jpg"/>
    </figure>
    <p class="content">Card content</p>
  </div>
</div>
```

```css
.container {
  background: #f3f1fe;
}

.card {
  background: #fff;
  box-shadow: 0 0 5px -2px rgba(0, 0, 0, 0.1);
}

.card figure {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-top: -60px;
  position: relative;
}

.card figure::before {
  content: "";
  border-radius: inherit;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  border: 1rem solid #f3f1fe;
  box-shadow: 0 1px rgba(0, 0, 0, 0.1);
}

.card figure img {
  border-radius: inherit;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```
