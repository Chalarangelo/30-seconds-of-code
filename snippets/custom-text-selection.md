### Custom text selection

Changes the styling of text selection.

#### HTML

```html
<p class="custom-text-selection">Select some of this text.</p>
```

#### CSS

```css
::selection {
  background: aquamarine;
  color: black;
}
.custom-text-selection::selection {
  background: red;
  color: white;
}
```

#### Demo

<div class="snippet-demo">
  <p>Global aquamarine selection color</p>
  <p class="snippet-demo__custom-text-selection">Red selection color.</p>
</div>

<style>
::selection {
  background: aquamarine;
  color: black;
}
::-moz-selection {
  background: aquamarine;
  color: black;
}
.snippet-demo__custom-text-selection::selection {
  background: red;
  color: white;
}
.snippet-demo__custom-text-selection::-moz-selection {
  background: red;
  color: white;
}
</style>

#### Explanation

`::selection` and `::-moz-selection` defines a pseudo selector on an element to style text within it when selected. Note that if you don't combine any other selector your style will be applied at document root level, to any selectable element.

#### Browser support

<span class="snippet__support-note">⚠️ Requires prefixes for full support and is not actually
in any specification.</span>

* https://caniuse.com/#feat=css-selection
