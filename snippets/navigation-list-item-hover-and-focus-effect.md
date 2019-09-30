---
title: Navigation list item hover and focus effect
tags: visual,beginner
---

Fancy hover and focus effect at navigation items using transform CSS property.

```html
<nav>
  <ul>
    <li><a href="#/">Home</a></li>
    <li><a href="#/">About</a></li>
    <li><a href="#/">Contact</a></li>
  </ul>
</nav>
```

```css
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

nav li {
  float: left;
}

nav li a {
  position: relative;
  display: block;
  color: #222;
  text-align: center;
  padding: 8px 12px;
  text-decoration: none;
}

li a::before {
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

li a:hover::before, li a:focus::before {
  transform: scale(1);
}

```

#### Explanation

- Use the `::before` pseudo-element at the list item anchor to create a hover effect, hide it using `transform: scale(0)`.
- Use the `:hover` and `:focus` pseudo-selectors to transition to `transform: scale(1)` and show the pseudo-element with its colored background.
- Prevent the pseudo-element from covering the anchor element by using `z-index: -1`.

#### Browser support

- https://caniuse.com/#feat=transforms2d
- https://caniuse.com/#feat=css-transitions
