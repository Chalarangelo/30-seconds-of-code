### Dynamic shadow

Creates a shadow similar to `box-shadow` but based on the colors of the element itself.

#### HTML

```html
<div class="dynamic-shadow"></div>
```

#### CSS

```css
.dynamic-shadow {
  position: relative;
  width: 10rem;
  height: 10rem;
  background: linear-gradient(75deg, #6d78ff, #00ffb8);
  z-index: 1;
}
.dynamic-shadow::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background: inherit;
  top: 0.5rem;
  filter: blur(0.4rem);
  opacity: 0.7;
  z-index: -1;
}
```

#### Demo

#### Explanation

1. `position: relative` on the element establishes a Cartesian positioning context for psuedo-elements.
2. `z-index: 1` establishes a new stacking context.
3. `::after` defines a pseudo-element.
4. `position: absolute` takes the pseudo element out of the flow of the document and positions it in relation to the parent.
5. `width: 100%` and `height: 100%` sizes the pseudo-element to fill its parent's dimensions, making it equal in size.
6. `background: inherit` causes the pseudo-element to inherit the linear gradient specified on the element.
7. `top: 0.5rem` offsets the pseudo-element down slightly from its parent.
8. `filter: blur(0.4rem)` will blur the pseudo-element to create the appearance of a shadow underneath.
9. `opacity: 0.7` makes the pseudo-element partially transparent.
10. `z-index: -1` positions the pseudo-element behind the parent but in front of the background.

#### Browser support

<span class="snippet__support-note">⚠️ Requires prefixes for full support.</span>

- https://caniuse.com/#feat=css-filters

<!-- tags: visual -->
