---
title: Masonry Layout
tags: layout,advanced
---

Creates a masonry-style layout that is especially useful when working with images.

- Create a masonry-style layout that consists of "bricks" that fall into each other with either a fixed `width` (vertical layout) or a fixed `height` (horizontal layout), forming a perfect fit. Especially useful when working with images.
- Define `.masonry-container`, the container for the masonry layout and `.masonry-columns` an inner container in which `.masonry-brick` elements will be placed.
- Apply `display: block` to `.masonry-brick` elements to allow the layout to flow properly.
- Use the `:first-child` pseudo-element selector to apply a different `margin` for the first element to account for its positioning.
- Use CSS variables to allow for greater flexibility within the layout in combination with media queries to ensure that the layout is responsive in different viewport sizes.

```html
<div class="masonry-container">
  <div class="masonry-columns">
    <img
      class="masonry-brick"
      src="https://picsum.photos/id/1016/384/256"
      alt="An image"
    />
    <img
      class="masonry-brick"
      src="https://picsum.photos/id/1025/495/330"
      alt="Another image"
    />
    <img
      class="masonry-brick"
      src="https://picsum.photos/id/1024/192/128"
      alt="Another image"
    />
    <img
      class="masonry-brick"
      src="https://picsum.photos/id/1028/518/345"
      alt="One more image"
    />
    <img
      class="masonry-brick"
      src="https://picsum.photos/id/1035/585/390"
      alt="And another one"
    />
    <img
      class="masonry-brick"
      src="https://picsum.photos/id/1074/384/216"
      alt="Last one"
    />
  </div>
</div>
```

```css
/* Container */
.masonry-container {
  --column-count-small: 1;
  --column-count-medium: 2;
  --column-count-large: 3;
  --column-gap: 0.125rem;
  padding: var(--column-gap);
}

/* Columns */
.masonry-columns {
  column-gap: var(--column-gap);
  column-count: var(--column-count-small);
  column-width: calc(1 / var(--column-count-small) * 100%);
}

@media only screen and (min-width: 640px) {
  .masonry-columns {
    column-count: var(--column-count-medium);
    column-width: calc(1 / var(--column-count-medium) * 100%);
  }
}

@media only screen and (min-width: 800px) {
  .masonry-columns {
    column-count: var(--column-count-large);
    column-width: calc(1 / var(--column-count-large) * 100%);
  }
}

/* Bricks */
.masonry-brick {
  width: 100%;
  height: auto;
  margin: var(--column-gap) 0;
  display: block;
}

.masonry-brick:first-child {
  margin: 0 0 var(--column-gap);
}
```
