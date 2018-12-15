### Popout menu

Reveals an interactive popout menu on hover and focus.

#### HTML

```html
<div class="reference" tabindex="0"><div class="popout-menu">Popout menu</div></div>
```

#### CSS

```css
.reference {
  position: relative;
  background: tomato;
  width: 100px;
  height: 100px;
}
.popout-menu {
  position: absolute;
  visibility: hidden;
  left: 100%;
  background: #333;
  color: white;
  padding: 15px;
}
.reference:hover > .popout-menu,
.reference:focus > .popout-menu,
.reference:focus-within > .popout-menu {
  visibility: visible;
}
```

#### Demo

#### Explanation

1. `position: relative` on the reference parent establishes a Cartesian positioning context for its child.
2. `position: absolute` takes the popout menu out of the flow of the document and positions it in relation to the parent.
3. `left: 100%` moves the the popout menu 100% of its parent's width from the left.
4. `visibility: hidden` hides the popout menu initially and allows for transitions (unlike `display: none`).
5. `.reference:hover > .popout-menu` means that when `.reference` is hovered over, select immediate children with a class of `.popout-menu` and change their `visibility` to `visible`, which shows the popout.
6. `.reference:focus > .popout-menu` means that when `.reference` is focused, the popout would be shown.
7. `.reference:focus-within > .popout-menu` ensures that the popout is shown when the focus is _within_ the reference.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

<!-- tags: interactivity -->
