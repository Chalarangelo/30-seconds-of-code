### Offscreen

A bulletproof way to completely hide an element visually and positionally in the DOM while still allowing it to be accessed by JavaScript and readable by screen readers. This method is very useful for accessibility ([ADA](https://adata.org/learn-about-ada)) development when more context is needed for visually-impaired users. As an alternative to `display: none` which is not readable by screen readers or `visibility: hidden` which takes up physical space in the DOM.

#### HTML

```html
<a class="button" href="http://pantswebsite.com">
  Learn More
  <span class="offscreen"> about pants</span>
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

<div class="snippet-demo">
  <a class="button" href="javascript:;">
    Learn More
    <span class="offscreen"> about pants</span>
  </a>
</div>

<style>
.snippet-demo__button {
  -webkit-appearance: none;
  appearance: none;
  background-color: #7983ff;
  border: none;
  border-radius: 0.25rem;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: sans-serif;
  font-size: 1rem;
  padding: 0.8rem 1rem;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s;
  width: auto;
}
.snippet-demo__button:hover { background-color: #717aef; }
.snippet-demo__offscreen {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
}
</style>

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

* https://caniuse.com/#search=clip

<!-- tags: layout, visual -->
