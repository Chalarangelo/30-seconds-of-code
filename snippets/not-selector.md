### :not selector

The `:not` psuedo selector is useful for styling a group of elements, while leaving the last (or specified) element unstyled.

#### HTML

```html
<ul class="css-not-selector-shortcut">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
  <li>Five</li>
</ul>
```

#### CSS

```css
.css-not-selector-shortcut {
  display: flex;
}

li {
  list-style-type: none;
  margin: 0;
  padding: 0 0.75rem;
}

li:not(:last-child) {
  border-right: 2px solid #d2d5e4;
}
```

#### Demo

<div class="snippet-demo">
  <ul class="snippet-demo__css-not-selector-shortcut">
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
    <li>Four</li>
    <li>Five</li>
  </ul>
</div>

<style>
.snippet-demo__css-not-selector-shortcut {
  display: flex;
  padding: 0;
}

.snippet-demo__css-not-selector-shortcut li {
  list-style-type: none;
  margin: 0;
  padding: 0 0.75rem;
}

.snippet-demo__css-not-selector-shortcut li:not(:last-child) {
  border-right: 2px solid #d2d5e4
}
</style>

#### Explanation

`li:not(:last-child)` specifies that the styles should apply to all `li` elements except
the `:last-child`.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

* https://caniuse.com/#feat=css-sel3

<!-- tags: visual -->
