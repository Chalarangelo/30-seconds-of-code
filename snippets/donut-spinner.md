### Donut spinner

Creates a donut spinner that can be used to indicate the loading of content.

#### HTML

```html
<div class="donut"></div>
```

#### CSS

```css
@keyframes donut-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg);}
}
.donut {
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.25);
  border-left-color: blue;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: donut-spin 1.2s linear infinite;
}
```

#### Demo

<div class="snippet-demo">
  <div class="snippet-demo__donut-spinner"></div>
</div>

<style>
@keyframes snippet-demo__donut-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg);}
}
.snippet-demo__donut-spinner {
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.25);
  border-left-color: blue;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: snippet-demo__donut-spin 1.2s linear infinite;
}
</style>

#### Explanation

Use a semi-transparent `border` for the whole element, except one side that will
serve as the loading indicator for the donut. Use `animation` to rotate the element.

#### Browser support

<span class="snippet__support-note">⚠️ Requires prefixes for full support.</span>

* https://caniuse.com/#feat=css-animation
* https://caniuse.com/#feat=transforms2d
