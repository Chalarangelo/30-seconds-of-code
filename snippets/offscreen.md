### Offscreen

A bulletproof way to completely hide an element visually and positionally in the DOM while still allowing it to be accessed by JavaScript and readable by screen readers. This method is very useful for accessibility ([ADA](https://adata.org/learn-about-ada)) development when more context is needed for visually-impaired users. As an alternative to `display: none` which is not readable by screen readers or `visibility: hidden` which takes up physical space in the DOM.

#### HTML

```html
<a class="button" href="http://pantswebsite.com">
  Learn More <span class="offscreen"> about pants</span>
</a>
```

#### CSS

```css
.offscreen {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
```

#### Demo

#### Explanation

1. Remove all borders.
2. Use `clip` to indicate that no part of the element should be shown.
3. Make the height and width of the element 1px.
4. Negate the elements height and width using `margin: -1px`.
5. Hide the element's overflow.
6. Remove all padding.
7. Position the element absolutely so that it does not take up space in the DOM.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

(Although `clip` technically has been depreciated, the newer `clip-path` currently has very limited browser support.)

- https://caniuse.com/#search=clip

<!-- tags: layout, visual -->
