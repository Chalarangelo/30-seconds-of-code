---
title: Navigation list item hover and focus effect
tags: visual,beginner
---

Creates a custom hover and focus effect for navigation items, using CSS transformations.

- Use the `:before` pseudo-element at the list item anchor to create a hover effect, hide it using `transform: scale(0)`.
- Use the `:hover` and `:focus` pseudo-class selectors to transition to `transform: scale(1)` and show the pseudo-element with its colored background.
- Prevent the pseudo-element from covering the anchor element by using `z-index`.

```html
<nav class="hover-nav">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

```css
.hover-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.hover-nav li {
  float: left;
}

.hover-nav li a {
  position: relative;
  display: block;
  color: #222;
  text-align: center;
  padding: 8px 12px;
  text-decoration: none;
  z-index: 0;
}

li a:before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  background-color: #f6c126;
  z-index: -1;
  transform: scale(0);
  transition: transform 0.5s ease-in-out;
}

li a:hover:before,
li a:focus:before {
  transform: scale(1);
}
```
