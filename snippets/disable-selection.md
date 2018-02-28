### Disable selection

Makes the content unselectable.

#### HTML

```html
<div>
  <p>You can select me.</p>
  <p class="unselectable">You can't select me!</p>
</div>
```

#### CSS

```css
.unselectable {
  user-select: none;
}
```

#### Demo

<div class="snippet-demo">
  <p>You can select me.</p>
  <p class="snippet-demo__disable-selection">You can't select me!</p>
</div>

<style>
.snippet-demo__disable-selection {
  user-select: none;
}
</style>

#### Explanation

`user-select: none` specifies that the text cannot be selected.

#### Browser support

<span class="snippet__support-note">⚠️ Requires prefixes for full support.</span>

* https://caniuse.com/#feat=user-select-none
