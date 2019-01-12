### Toggle switch

Creates a toggle switch with CSS only.

#### HTML

```html
<input type="checkbox" id="toggle" class="offscreen" /> <label for="toggle" class="switch"></label>
```

#### CSS

```css
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  transition: all 0.3s;
}

.switch::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background-color: white;
  top: 1px;
  left: 1px;
  transition: all 0.3s;
}

input[type='checkbox']:checked + .switch::after {
  transform: translateX(20px);
}

input[type='checkbox']:checked + .switch {
  background-color: #7983ff;
}

.offscreen {
  position: absolute;
  left: -9999px;
}
```

#### Demo

#### Explanation

This effect is styling only the `<label>` element to look like a toggle switch, and hiding the actual `<input>` checkbox by positioning it offscreen. When clicking the label associated with the `<input>` element, it sets the `<input>` checkbox into the `:checked` state.

1. The `for` attribute associates the `<label>` with the appropriate `<input>` checkbox element by its `id`.
2. `.switch::after` defines a pseudo-element for the `<label>` to create the circular knob.
3. `input[type='checkbox']:checked + .switch::after` targets the `<label>`'s pseudo-element's style when the checkbox is `checked`.
4. `transform: translateX(20px)` moves the pseudo-element (knob) 20px to the right when the checkbox is `checked`.
5. `background-color: #7983ff;` sets the background-color of the switch to a different color when the checkbox is `checked`.
6. `.offscreen` moves the `<input>` checkbox element, which does not comprise any part of the actual toggle switch, out of the flow of document and positions it far away from the view, but does not hide it so it is accessible via keyboard and screen readers.
7. `transition: all 0.3s` specifies all property changes will be transitioned over 0.3 seconds, therefore transitioning the `<label>`'s `background-color` and the pseudo-element's `transform` property when the checkbox is checked.

#### Browser support

<span class="snippet__support-note">⚠️ Requires prefixes for full support.</span>

- https://caniuse.com/#feat=transforms2d

<!-- tags: visual, interactivity -->
<!-- date: 2018-10-03 -->
