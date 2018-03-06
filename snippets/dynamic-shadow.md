### Dynamic shadow

Creates a shadow similar to `box-shadow` but based on the colors of the element itself.

#### HTML

```html
<div class="dynamic-shadow-parent">
  <div class="dynamic-shadow"></div>
</div>
```

#### CSS

```css
.dynamic-shadow-parent {
  position: relative;
  z-index: 1;
}
.dynamic-shadow {
  position: relative;
  width: 10rem;
  height: 10rem;
  background: linear-gradient(75deg, #6d78ff, #00ffb8);
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

<div class="snippet-demo">
  <div class="snippet-demo__dynamic-shadow-parent">
    <div class="snippet-demo__dynamic-shadow"></div>
  </div>
</div>

<style>
.snippet-demo__dynamic-shadow-parent {
  position: relative;
  z-index: 1;
}
.snippet-demo__dynamic-shadow {
  position: relative;
  width: 10rem;
  height: 10rem;
  background: linear-gradient(75deg, #6d78ff, #00ffb8);
}
.snippet-demo__dynamic-shadow::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: inherit;
  top: 0.5rem;
  filter: blur(0.4rem);
  opacity: 0.7;
  z-index: -1;
}
</style>

#### Explanation

The snippet requires a somewhat complex case of stacking contexts to get right, such that the pseudo-element
will be positioned underneath the element itself while still being visible.

1. `position: relative` on the parent establishes a Cartesian positioning context for child elements.
2. `z-index: 1` establishes a new stacking context.
3. `position: relative` on the child establishes a positioning context for pseudo-elements.
4. `::after` defines a pseudo-element.
5. `position: absolute` takes the pseudo element out of the flow of the document and positions it in relation to the parent.
6. `width: 100%` and `height: 100%` sizes the pseudo-element to fill its parent's dimensions, making it equal in size.
7. `background: inherit` causes the pseudo-element to inherit the linear gradient specified on the element.
8. `top: 0.5rem` offsets the pseudo-element down slightly from its parent.
9. `filter: blur(0.4rem)` will blur the pseudo-element to create the appearance of a shadow underneath.
10. `opacity: 0.7` makes the pseudo-element partially transparent.
11. `z-index: -1` positions the pseudo-element behind the parent.

#### Browser support

<span class="snippet__support-note">⚠️ Requires prefixes for full support.</span>

* https://caniuse.com/#feat=css-filters

<!-- tags: visual -->
