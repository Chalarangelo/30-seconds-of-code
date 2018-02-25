### Custom text selection

Changes the styling of text selection.

#### HTML

```html
<p class="custom-text-selection">Select some of this text.</p>
```

#### CSS

```css
.text-selection::selection {
  background: red;
  color: white;
}
```

#### Demo

<div class="snippet-demo">
  <p class="snippet-demo__custom-text-selection">Select some of this text.</p>
</div>

<style>
.snippet-demo__custom-text-selection::selection {
  background: red;
  color: white;
}
</style>

#### Explanation

`::selection` defines a pseudo selector on an element to style text within it when selected.

#### Browser support

<span class="snippet__support-note">⚠️ Requires prefixes for full support.</span>

* https://caniuse.com/#feat=css-selection
