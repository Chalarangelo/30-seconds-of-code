### Hover Shadow Box Animation

Creates a shadow box around the text whern it is hovered.

#### HTML

```html
<p class="hover-shadow-box-animation">Box it!</p>
```

#### CSS

```css
.hover-shadow-box-animation {
  display: inline-block;
  vertical-align: middle;
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  margin: 10px;
  transition-duration: 0.3s;
  transition-property: box-shadow, transform;
}
.hover-shadow-box-animation:hover,
.hover-shadow-box-animation:focus,
.hover-shadow-box-animation:active {
  box-shadow: 1px 10px 10px -10px rgba(0, 0, 24, 0.5);
  transform: scale(1.2);
}
```

#### Demo

#### Explanation

1. `display: inline-block` to set width and length for `p` element thus making it an `inline-block`.
2. Set `transform: perspective(1px)` to give element a 3D space by affecting the distance between the Z plane and the user and `translate(0)` to reposition the `p` element along z-axis in 3D space.
3. `box-shadow:` to set up the box.
4. `transparent` to make box transparent.
5. `transition-property` to enable transitions for both `box-shadow` and `transform`.
6. `:hover` to activate whole css when hovering is done until `active`.
7. `transform: scale(1.2)` to change the scale, magnifying the text.

#### Browser Support

<span class="snippet__support-note">✅ No caveats.</span>

- https://caniuse.com/#feat=transforms3d
- https://caniuse.com/#feat=css-transitions

<!-- tags: animation -->
