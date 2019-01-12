### Transform centering

Vertically and horizontally centers a child element within its parent element using `position: absolute` and `transform: translate()` (as an alternative to `flexbox` or `display: table`). Similar to `flexbox`, this method does not require you to know the height or width of your parent or child so it is ideal for responsive applications.

#### HTML

```html
<div class="parent"><div class="child">Centered content</div></div>
```

#### CSS

```css
.parent {
  border: 1px solid #333;
  height: 250px;
  position: relative;
  width: 250px;
}

.child {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
```

#### Demo

#### Explanation

1. `position: absolute` on the child element allows it to be positioned based on its containing block.
2. `left: 50%` and `top: 50%` offsets the child 50% from the left and top edge of its containing block.
3. `transform: translate(-50%, -50%)` allows the height and width of the child element to be negated so that it is vertically and horizontally centered.

Note: Fixed height and width on parent element is for the demo only.

#### Browser support

<span class="snippet__support-note">⚠️ Requires prefix for full support.</span>

- https://caniuse.com/#search=transform

<!-- tags: layout -->
