### Border with top triangle

Use pure CSS to create div with top triangle.

#### HTML

```html
<div class="container">
  Border with top triangle
</div>
```

#### CSS

```css
.container {
  display: block;
  position: relative;
  background: #ffffff;
  padding: 15px;
  border: 1px solid #dddddd;
  margin-top: 20px;
}

.container:before, .container:after {
  content: '';
  display: block;
  position: absolute;
  bottom: 100%;
  width: 0;
  height: 0;
}

.container:before {
  left: 19px;
  border: 11px solid transparent;
  border-bottom-color: #dddddd;
}

.container:after {
  left: 20px;
  border: 10px solid transparent;
  border-bottom-color: #ffffff;
}
```

#### Demo

#### Explanation

1. Use pseudo-element `before` and `after` to create two triangles. How to create triangle can see the [Triangle](https://30-seconds.github.io/30-seconds-of-css/#triangle). 
2. The color of the `before` triangle as same as the container border color. The color of the `after` triangle as same as the container background color.
3. The border width of the `before` triangle is wider 1px(depend on the border width of container) than the `after` triangle, then we can see the top triangle border on the container.
4. The `after` triangle is on the right of the `before` triangle(1px) so that can make the left part border of the `before` triangle to visible.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

<!-- tags: visual -->
