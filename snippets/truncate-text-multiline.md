### Truncate text multiline

If the text is longer than one line, it will be truncated for `n` lines and end with an ellipsis `…`.

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
  text-overflow: ellipsis;
  display: block;
  display: -webkit-box;
  height: 109.2px;
  margin: 0 auto;
  font-size: 26px;
  line-height: 1.4;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  width: 400px;
}
```

#### Demo

#### Explanation

1. `overflow: hidden` prevents the text from overflowing its dimensions
   (for a block, 100% width and auto height).
2. `text-overflow: ellipsis` makes it so that if the text exceeds its dimensions, it
   will end with an ellipsis.
3. `width: 400px` ensures the element has a dimension, to know when to get ellipsis
4. `display: -webkit-box` attribute that allows to work with `line-clamp`
5. `-webkit-line-clamp: 3` number of lines to be truncated (in this case there will be only 3 visible lines)
6. `-webkit-box-orient: horizontal` specify that text will go vertically
7. `display: block` fallback for unsupported browsers
8. `height: 109.2px` fallback, calculated value for height, it equals `font-size * line-height * numberOfLines` (in this case `26 * 1.4 * 3 = 109.2`)

#### Browser support

<span class="snippet__support-note">⚠️ Requires prefix for full support.</span>

- https://caniuse.com/#feat=css-line-clamp

<!-- tags: layout -->
