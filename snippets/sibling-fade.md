### sibling-fade

Fade out siblings around a hovered item

#### HTML

```html
<nav>
  <a href="#">Item 01</a>
  <a href="#">Item 02</a>
  <a href="#">Item 03</a>
  <a href="#">Item 04</a>
  <a href="#">Item 05</a>
  <a href="#">Item 06</a>
</nav>
```

#### CSS

```css
nav {
  cursor: default;
  display: flex;
}

a {
  color: #333;
  font-weight: bold;
  font-family: sans-serif;
  text-decoration: none;
  padding: 8px 16px;
  transition: opacity 0.2s;
}

nav:hover a:not(:hover) {
  opacity: 0.4;
}
```

#### Demo

#### Explanation

1. `display: flex ` enables flexbox.
2. `transition: opacity 0.2s` means changes to opacity will be transitioned over 0.2 seconds.
3. `nav:hover a:not(:hover)` changes the opacity of un-hover childs to 0.4.

#### Browser support
✅ No caveats.
