### Grid centering

Horizontally and vertically centers a child element within a parent element using `grid`.

#### HTML

```html
<div class="grid-centering">
  <div class="child"></div>
</div>
```

#### CSS

```css
.grid-centering {
  display: grid;
  justify-content: center;
  align-items: center;
}
```

#### Demo

<div class="snippet-demo">
  <div class="snippet-demo__grid-centering">
    <p class="snippet-demo__grid-centering__child">Centered content.</p>
  </div>
</div>

<style>
.snippet-demo__grid-centering {
  display: grid;
  justify-content: center;
  align-items: center;
  height: 200px;
}
</style>

#### Explanation

1. `display: grid` enables grid.
2. `justify-content: center` centers the child horizontally.
3. `align-items: center` centers the child vertically.

#### Browser support

<span class="snippet__support-note">⚠️ Needs prefixes for full support.</span>

* https://caniuse.com/#feat=flexbox

<!-- tags: layout -->
