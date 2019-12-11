---
title: Masonry Layout
tags: layout,intermediate
---

This snippet creates a vertical Masonry layout using pure HTML and CSS.

```html
<div class="masonry-container">
  <div class="masonry-columns">
    <img class="masonry-brick" src="https://picsum.photos/id/1016/384/256" alt="An image as brick">
    <img class="masonry-brick" src="https://picsum.photos/id/1025/495/330" alt="And another one">
    <img class="masonry-brick" src="https://picsum.photos/id/1024/192/128" alt="And another one">
      <img class="masonry-brick" src="https://picsum.photos/id/1028/518/345" alt="And another one...">
    <img class="masonry-brick" src="https://picsum.photos/id/1035/585/390" alt="Keep in mind that it is important to use display block">
    <img class="masonry-brick" src="https://picsum.photos/id/104/384/216" alt="to be able to use inline elements like these">
  </div>
</div>
```

```css
.masonry-container {
  --column-count-small: 1;
  --column-count-medium: 2;
  --column-count-large: 3;
  --column-gap: 0; /* Try 1rem or 2rem */

  padding: var(--column-gap);
}

/* Columns */

.masonry-container .masonry-columns {
  column-gap: var(--column-gap);
  -webkit-column-gap: var(--column-gap);
  -moz-column-gap: var(--column-gap);
  -ms-column-gap: var(--column-gap);
  -o-column-gap: var(--column-gap);
}

@media only screen and (min-width: 800px) {
  .masonry-container .masonry-columns {
    column-count: var(--column-count-large);
    -webkit-column-count: var(--column-count-large);
    -moz-column-count: var(--column-count-large);
    -ms-column-count: var(--column-count-large);
    -o-column-count: var(--column-count-large);
    column-width: calc(1 / var(--column-count-large) * 100%);
    -webkit-column-width: calc(1 / var(--column-count-large) * 100%);
    -moz-column-width: calc(1 / var(--column-count-large) * 100%);
    -ms-column-width: calc(1 / var(--column-count-large) * 100%);
    -o-column-width: calc(1 / var(--column-count-large) * 100%);
  }
}

@media only screen and (min-width: 640px) and (max-width: 799px) {
  .masonry-container .masonry-columns {
    column-count: var(--column-count-medium);
    -webkit-column-count: var(--column-count-medium);
    -moz-column-count: var(--column-count-medium);
    -ms-column-count: var(--column-count-medium);
    -o-column-count: var(--column-count-medium);
    column-width: calc(1 / var(--column-count-medium) * 100%);
    -webkit-column-width: calc(1 / var(--column-count-medium) * 100%);
    -moz-column-width: calc(1 / var(--column-count-medium) * 100%);
    -ms-column-width: calc(1 / var(--column-count-medium) * 100%);
    -o-column-width: calc(1 / var(--column-count-medium) * 100%);
  }
}

@media only screen and (max-width: 639px) {
  .masonry-container .masonry-columns {
    column-count: var(--column-count-small);
    -webkit-column-count: var(--column-count-small);
    -moz-column-count: var(--column-count-small);
    -ms-column-count: var(--column-count-small);
    -o-column-count: var(--column-count-small);
    column-width: calc(1 / var(--column-count-small) * 100%);
    -webkit-column-width: calc(1 / var(--column-count-small) * 100%);
    -moz-column-width: calc(1 / var(--column-count-small) * 100%);
    -ms-column-width: calc(1 / var(--column-count-small) * 100%);
    -o-column-width: calc(1 / var(--column-count-small) * 100%);
  }
}

/* Bricks */
.masonry-container .masonry-columns .masonry-brick {
  width: 100%;
  height: auto;
  margin: var(--column-gap) 0;
  display: block;
}

.masonry-container .masonry-columns .masonry-brick:first-child {
  margin: 0 0 var(--column-gap);
}
```

#### Explanation

- This snippet creates a Masonry style layout using pure HTML and CSS. Not only is this lightweight, it prevents render blocking as the browser will directly place all contents at the right places.
- A Masonry layout consists of "bricks" that fall into each other, with either a fixed width (vertical layout) or a fixed height (horizontal layout), forming a perfect fit. It looks the best when working with images.
- Masonry is not the same as a CSS grid or Flexbox &mdash; they usually have both fixed width and height, a Masonry-layout has one variable dimension (width or height), and forms a perfect fit.
- `.masonry-container` is the container for the Masonry layout. Within that container, there's a div `.masonry-columns`, which will automatically put each child element `.masonry-brick` into a Masonry layout. There's some CSS that ensures that `.masonry-brick` is a block-level element and that the first one will have no margin on top.
- You can change the CSS3 variables to fine-tune it.
- An interactive example with more images: https://jsfiddle.net/ellipticcurv3/q8Ljcfam/

#### Browser support

- https://www.caniuse.com/#feat=css-variables
- https://www.caniuse.com/#feat=calc
- https://www.caniuse.com/#feat=mdn-css_properties_column-count
- https://www.caniuse.com/#feat=mdn-css_properties_column-width
- https://www.caniuse.com/#feat=mdn-css_properties_column-gap_multicol_context
