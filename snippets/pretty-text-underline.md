### Pretty text underline

A nicer alternative to `text-decoration: underline` where descenders do not clip the underline.
Natively implemented as `text-decoration-skip-ink: auto` but it has less control over the underline.

#### HTML

```html
<p class="pretty-text-underline">Pretty text underline without clipping descending letters.</p>
```

#### CSS

```css
.pretty-text-underline {
  font-family: Arial, sans-serif;
  display: inline;
  font-size: 18px;
  text-shadow: 1px 1px 0 #f5f6f9,
    -1px 1px 0 #f5f6f9,
    -1px -1px 0 #f5f6f9,
    1px -1px 0 #f5f6f9;
  background-image: linear-gradient(90deg, currentColor 100%, transparent 100%);
  background-position: 0 0.98em;
  background-repeat: repeat-x;
  background-size: 1px 1px;
}
.pretty-text-underline::-moz-selection {
  background-color: rgba(0, 150, 255, 0.3);
  text-shadow: none;
}
.pretty-text-underline::selection {
  background-color: rgba(0, 150, 255, 0.3);
  text-shadow: none;
}
```

#### Demo

<div class="snippet-demo">
  <p class="snippet-demo__pretty-text-underline">Pretty text underline without clipping descending letters.</p>
</div>

<style>
.snippet-demo__pretty-text-underline {
  font-family: Arial, sans-serif;
  display: inline;
  font-size: 18px !important;
  text-shadow: 1px 1px 0 #f5f6f9,
    -1px 1px 0 #f5f6f9,
    -1px -1px 0 #f5f6f9,
    1px -1px 0 #f5f6f9;
  background-image: linear-gradient(90deg, currentColor 100%, transparent 100%);
  background-position: 0 0.98em;
  background-repeat: repeat-x;
  background-size: 1px 1px;
}

.snippet-demo__pretty-text-underline::-moz-selection {
  background-color: rgba(0, 150, 255, 0.3);
  text-shadow: none;
}

.snippet-demo__pretty-text-underline::selection {
  background-color: rgba(0, 150, 255, 0.3);
  text-shadow: none;
}
</style>

#### Explanation

1. `text-shadow: ...` has 4 values with offsets that cover a 4x4 px area to ensure the underline
  has a "thick" shadow that covers the line where descenders clip it. Use a color
  that matches the background. For a larger font, use a larger `px` size.
2. `background-image: linear-gradient(...)` creates a 90deg gradient with the current
  text color (`currentColor`).
3. The `background-*` properties size the gradient as 1x1px at the bottom and repeats it along the x-axis.
4. The `::selection` pseudo selector ensures the text shadow does not interfere with text
  selection.

#### Browser support

<span class="snippet__support-note">⚠️ The distance of the underline from the text depends on the internal metrics of a font, so you must ensure everyone sees the same font (i.e. no system fonts which will change based on the OS).</span>

* https://caniuse.com/#feat=css-textshadow
* https://caniuse.com/#feat=css-gradients
