### Box-sizing reset

Resets the box-model so that `width`s and `height`s are not affected by their `border`s or `padding`.

#### HTML

```html
<div class="box">border-box</div>
<div class="box content-box">content-box</div>
```

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
.box {
  display: inline-block;
  width: 150px;
  height: 150px;
  padding: 10px;
  background: tomato;
  color: white;
  border: 10px solid red;
}
.content-box {
  box-sizing: content-box;
}
```

#### Demo

#### Explanation

1. `box-sizing: border-box` makes the addition of `padding` or `border`s not affect an element's `width` or `height`.
2. `box-sizing: inherit` makes an element respect its parent's `box-sizing` rule.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

- https://caniuse.com/#feat=css3-boxsizing

<!-- tags: layout -->
