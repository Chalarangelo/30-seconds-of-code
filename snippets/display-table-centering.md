### Display table centering

Vertically and horizontally centers a child element within its parent element using `display: table` (as an alternative to `flexbox`).

#### HTML

```html
<div class="container">
  <div class="center"><span>Centered content</span></div>
</div>
```

#### CSS

```css
.container {
  border: 1px solid #333;
  height: 250px;
  width: 250px;
}

.center {
  display: table;
  height: 100%;
  width: 100%;
}

.center > span {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
```

#### Demo

#### Explanation

1. `display: table` on '.center' allows the element to behave like a `<table>` HTML element.
2. 100% height and width on '.center' allows the element to fill the available space within its parent element.
3. `display: table-cell` on '.center > span' allows the element to behave like an <td> HTML element.
4. `text-align: center` on '.center > span' centers the child element horizontally.
5. `vertical-align: middle` on '.center > span' centers the child element vertically.

The outer parent ('.container' in this case) must have a fixed height and width.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

- https://caniuse.com/#search=display%3A%20table

<!-- tags: layout -->
