---
title: Hover underline animation
tags: animation,advanced
---

Creates an animated underline effect when the text is hovered over.

```html
<p class="hover-underline-animation">Hover this text to see the effect!</p>
```

```css
.hover-underline-animation {
  display: inline-block;
  position: relative;
  color: #0087ca;
}

.hover-underline-animation:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #0087ca;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
```

#### Explanation

- `display: inline-block` makes the block `p` an `inline-block` to prevent the underline from spanning the entire parent width rather than just the content (text).
- `position: relative` on the element establishes a Cartesian positioning context for pseudo-elements.
- `:after` defines a pseudo-element.
- `position: absolute` takes the pseudo element out of the flow of the document and positions it in relation to the parent.
- `width: 100%` ensures the pseudo-element spans the entire width of the text block.
- `transform: scaleX(0)` initially scales the pseudo element to 0 so it has no width and is not visible.
- `bottom: 0` and `left: 0` position it to the bottom left of the block.
- `transition: transform 0.25s ease-out` means changes to `transform` will be transitioned over 0.25 seconds with an `ease-out` timing function.
- `transform-origin: bottom right` means the transform anchor point is positioned at the bottom right of the block.
- `:hover:after` then uses `scaleX(1)` to transition the width to 100%, then changes the `transform-origin` to `bottom left` so that the anchor point is reversed, allowing it transition out in the other direction when hovered off.

#### Browser support
