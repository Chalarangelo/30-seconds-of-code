### Grid centering

Horizontally and vertically centers a child element within a parent element using `grid`.

#### HTML

```html
<div class="grid-centering"><div class="child">Centered content.</div></div>
```

#### CSS

```css
.grid-centering {
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100px;
}
```

#### Demo

#### Explanation

1. `display: grid` enables grid.
2. `justify-content: center` centers the child horizontally.
3. `align-items: center` centers the child vertically.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

- https://caniuse.com/#feat=css-grid

<!-- tags: layout -->
