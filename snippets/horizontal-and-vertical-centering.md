### Horizontal and vertical centering

Horizontally and vertically centers a child element within a parent element.

#### HTML

```html
<div class="horizontal-and-vertical-centering">
  <div class="child"></div>
</div>
```

#### CSS

```css
.horizontal-and-vertical-centering {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

#### Demo

<div class="snippet-demo">
  <div class="snippet-demo__horizontal-and-vertical-centering">
    <p class="snippet-demo__horizontal-and-vertical-centering__child">Centered content.</p>
  </div>
</div>

<style>
.snippet-demo__horizontal-and-vertical-centering {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
</style>

#### Explanation

1. `display: flex` enables flexbox.
2. `justify-content: center` centers the child horizontally.
3. `align-items: center` centers the child vertically.

#### Browser support

<span class="snippet__support-note">⚠️ Needs prefixes for full support.</span>

* https://caniuse.com/#feat=flexbox

<!-- tags: layout -->
