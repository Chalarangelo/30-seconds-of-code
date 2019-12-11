---
title: Masonry Layout
tags: layout,advanced
---

Creates a vertical Masonry layout using pure HTML and CSS.

```html
<div class="masonry-container">
  <div class="masonry-columns">
    <img class="masonry-brick" src="https://picsum.photos/id/1016/384/256" alt="An image">
    <img class="masonry-brick" src="https://picsum.photos/id/1025/495/330" alt="Another image">
    <img class="masonry-brick" src="https://picsum.photos/id/1024/192/128" alt="Another image">
    <img class="masonry-brick" src="https://picsum.photos/id/1028/518/345" alt="One more image">
    <img class="masonry-brick" src="https://picsum.photos/id/1035/585/390" alt="And another one">
    <img class="masonry-brick" src="https://picsum.photos/id/1074/384/216" alt="Last one">
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

#### Explanation

- Create a masonry-style layout that consists of "bricks" that fall into each other with either a fidex `width` (vertical layout) or a fixed `height` (horizontal layout), forming a perfect fit. Especially useful when working with images.
- `.masonry-container` is the container for the masonry layout. Within that container, there's a `div.masonry-columns`, which will automatically put each child element, `.masonry-brick`, into the layout. 
- `.masonry-brick` must be have `display: block` to allow the layout to flow properly, while the `:first-child` of this class should have a different `margin` to account for its positioning.
- CSS variables are used to allow for greater flexibility for the layout, while media queries ensure that the layout flows responsively in different viewport sizes.

#### Browser support

- https://www.caniuse.com/#feat=css-variables
- https://www.caniuse.com/#feat=calc
- https://www.caniuse.com/#feat=mdn-css_properties_column-count
- https://www.caniuse.com/#feat=mdn-css_properties_column-width
- https://www.caniuse.com/#feat=mdn-css_properties_column-gap_multicol_context
