### Box-sizing reset

Resets the box-model so that `width`s and `height`s are not affected by their `border`s or `padding`.

#### CSS

```css
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}
```

#### Demo

<div class="snippet-demo">
  <div class="snippet-demo__box-sizing-reset">Demo</div>
</div>

<style>
.snippet-demo__box-sizing-reset {
  box-sizing: border-box;
  width: 200px;
  padding: 1.5em;
  color: #7983ff;
  font-family: sans-serif;
  background-color: white;
  border: 5px solid;
}
</style>

#### Explanation

1. `box-sizing: border-box` makes the addition of `padding` or `border`s not affect an element's `width` or `height`.
2. `box-sizing: inherit` makes an element respect its parent's `box-sizing` rule.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

* https://caniuse.com/#feat=css3-boxsizing

<!-- tags: layout -->
