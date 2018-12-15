### Flexbox centering

Horizontally and vertically centers a child element within a parent element using `flexbox`.

#### HTML

```html
<div class="flexbox-centering"><div class="child">Centered content.</div></div>
```

#### CSS

```css
.flexbox-centering {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
```

#### Demo

#### Explanation

1. `display: flex` enables flexbox.
2. `justify-content: center` centers the child horizontally.
3. `align-items: center` centers the child vertically.

#### Browser support

<span class="snippet__support-note">⚠️ Needs prefixes for full support.</span>

- https://caniuse.com/#feat=flexbox

<!-- tags: layout -->
