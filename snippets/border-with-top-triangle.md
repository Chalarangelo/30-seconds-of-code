---
title: Border with top triangle
tags: visual,beginner
---

Creates a text container with a triangle at the top.

```html
<div class="container">
  Border with top triangle
</div>
```

```css
.container {
  position: relative;
  background: #ffffff;
  padding: 15px;
  border: 1px solid #dddddd;
  margin-top: 20px;
}

.container:before, .container:after {
  content: '';
  position: absolute;
  bottom: 100%;
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

#### Explanation

- Use the `:before` and `:after` pseudo-elements to create two triangles.
- The color of the `:before` triangle should be the same as the container's border color.
- The color of the `:after` triangle should be the same as the container's background color.
- The border width of the `:before` triangle should be `1px` wider than the `:after` triangle, in order to act as the border.
- The `:after` triangle should be `1px` to the right of the `:before` triangle to allow for its left border to be shown.

#### Browser support
