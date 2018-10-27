### Hover underline animation

Creates an animated underline effect when the text is hovered over.

<small>**Credit:** https://flatuicolors.com/</small>

#### HTML

```html
<p class="hover-underline-animation">Hover this text to see the effect!</p>
```

#### CSS

```css
.hover-underline-animation {
  display: inline-block;
  position: relative;
  color: #0087ca;
}
.hover-underline-animation::after {
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
.hover-underline-animation:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
```

#### Demo

#### Explanation

1. `display: inline-block` makes the block `p` an `inline-block` to prevent the underline from
   spanning the entire parent width rather than just the content (text).
2. `position: relative` on the element establishes a Cartesian positioning context for pseudo-elements.
3. `::after` defines a pseudo-element.
4. `position: absolute` takes the pseudo element out of the flow of the document and positions it in relation to the parent.
5. `width: 100%` ensures the pseudo-element spans the entire width of the text block.
6. `transform: scaleX(0)` initially scales the pseudo element to 0 so it has no width and is not visible.
7. `bottom: 0` and `left: 0` position it to the bottom left of the block.
8. `transition: transform 0.25s ease-out` means changes to `transform` will be transitioned over 0.25 seconds
   with an `ease-out` timing function.
9. `transform-origin: bottom right` means the transform anchor point is positioned at the bottom right of the block.
10. `:hover::after` then uses `scaleX(1)` to transition the width to 100%, then changes the `transform-origin`
    to `bottom left` so that the anchor point is reversed, allowing it transition out in the other direction when
    hovered off.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

- https://caniuse.com/#feat=transforms2d
- https://caniuse.com/#feat=css-transitions

<!-- tags: animation -->
