---
title: Perspective transform on hover
type: snippet
language: css
tags: [animation]
cover: shiny-mountains
dateModified: 2021-05-17
---

Applies a perspective transform with a hover animation to an element.

- Use `transform` with the `perspective()` and `rotateY()` functions to create a perspective for the element.
- Use a `transition` to update the `transform` attribute's value on hover.
- Change the `rotateY()` value to negative to mirror the perspective effect from left to right.

```html
<div class="card-container">
  <div class="image-card perspective-left"></div>
  <div class="image-card perspective-right"></div>
</div>
```

```css
.image-card {
  display: inline-block;
  box-sizing: border-box;
  margin: 1rem;
  width: 240px;
  height: 320px;
  padding: 8px;
  border-radius: 1rem;
  background: url("https://picsum.photos/id/1049/240/320");
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
}

.perspective-left {
  transform: perspective(1500px) rotateY(15deg);
  transition: transform 1s ease 0s;
}

.perspective-left:hover {
  transform: perspective(3000px) rotateY(5deg);
}

.perspective-right {
  transform: perspective(1500px) rotateY(-15deg);
  transition: transform 1s ease 0s;
}

.perspective-right:hover {
  transform: perspective(3000px) rotateY(-5deg);
}
```
