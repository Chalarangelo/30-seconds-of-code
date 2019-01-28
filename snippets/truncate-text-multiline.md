### Truncate text multiline

If the text is longer than one line, it will be truncated for `n` lines and end with an gradient fade.

#### HTML

```html
<p class="truncate-text-multiline">
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
  labore et.
</p>
```

#### CSS

```css
.truncate-text-multiline {
  overflow: hidden;
  display: block;
  height: 109.2px;
  margin: 0 auto;
  font-size: 26px;
  line-height: 1.4;
  width: 400px;
  position: relative;
}

.truncate-text-multiline:after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 150px;
  height: 36.4px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), #f5f6f9 50%);
}
```

#### Demo

#### Explanation

1. `overflow: hidden` prevents the text from overflowing its dimensions
   (for a block, 100% width and auto height).
2. `width: 400px` ensures the element has a dimension.
3. `height: 109.2px` calculated value for height, it equals `font-size * line-height * numberOfLines` (in this case `26 * 1.4 * 3 = 109.2`)
4. `height: 36.4px` calculated value for gradient container, it equals `font-size * line-height` (in this case `26 * 1.4 = 36.4`)
5. `background: linear-gradient(to right, rgba(0, 0, 0, 0), #f5f6f9 50%)` gradient from `transparent` to `#f5f6f9`

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

<!-- tags: layout -->
