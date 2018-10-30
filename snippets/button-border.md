### Toggle switch

Creates a border animation on hover.

#### HTML

```html
<button class="button">Submit</button>
```

#### CSS

```css
@import url(https://fonts.googleapis.com/css?family=BenchNine:700);
.button {
  background-color: #c47135;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: 'BenchNine', Arial, sans-serif;
  font-size: 1em;
  font-size: 22px;
  line-height: 1em;
  margin: 15px 40px;
  outline: none;
  padding: 12px 40px 10px;
  position: relative;
  text-transform: uppercase;
  font-weight: 700;
}

.button:before,
.button:after {
  border-color: transparent;
  -webkit-transition: all 0.25s;
  transition: all 0.25s;
  border-style: solid;
  border-width: 0;
  content: '';
  height: 24px;
  position: absolute;
  width: 24px;
}

.button:before {
  border-color: #c47135;
  border-top-width: 2px;
  left: 0px;
  top: -5px;
}

.button:after {
  border-bottom-width: 2px;
  border-color: #c47135;
  bottom: -5px;
  right: 0px;
}

.button:hover,
.button.hover {
  background-color: #c47135;
}

.button:hover:before,
.button.hover:before,
.button:hover:after,
.button.hover:after {
  height: 100%;
  width: 100%;
}
```

#### Demo

#### Explanation

This effect is uses before and after selectors to make the border full width on hover.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

<!-- tags: visual, interactivity -->
<!-- date: 2018-10-30 -->
