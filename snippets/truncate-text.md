### Truncate text

If the text is longer than one line, it will be truncated and end with an ellipsis `…`.

#### HTML

```html
<p class="truncate-text">If I exceed one line's width, I will be truncated.</p>
```

#### CSS

```css
.truncate-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 200px;
}
```

#### Demo

#### Explanation

1. `overflow: hidden` prevents the text from overflowing its dimensions
   (for a block, 100% width and auto height).
2. `white-space: nowrap` prevents the text from exceeding one line in height.
3. `text-overflow: ellipsis` makes it so that if the text exceeds its dimensions, it
   will end with an ellipsis.
4. `width: 200px;` ensures the element has a dimension, to know when to get ellipsis

#### Browser support

<span class="snippet__support-note">⚠️ Only works for single line elements.</span>

- https://caniuse.com/#feat=text-overflow

<!-- tags: layout -->
