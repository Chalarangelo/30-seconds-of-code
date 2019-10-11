---
title: Hamburguer Button
tags: interactivity,beginner
---

This is a way to build simple hamburger button for menu bar.

```html
<button class="hb"></button>
```

```css
.hb,
.hb:before,
.hb:after {
  position: relative;
  width: 30px;
  height: 5px;
  border: none;
  outline: none;
  background-color: #333;
  border-radius: 3px;
  transition: 0.5s;
  cursor: pointer;
}

.hb:before,
.hb:after {
  content: '';
  position: absolute;
  top: -7.5px;
  left: 0;
}

.hb:after {
  top: 7.5px;
}

.hb:hover {
  background-color: transparent;
}

.hb:hover:before,
.hb:hover:after {
  top: 0;
}

.hb:hover::before {
  transform: rotate(45deg);
}

.hb:hover::after {
  transform: rotate(-45deg);
}
```

#### Explanation

- You need one button to middle bar.
- Use the pseudo-elements `:before` and `:after` to create bar top and bottom.
- Keep them in rows using position `:relative` in the `:button` and position `:aboslute` in `:before` and `:after`.
- Use `:hover` for rotate `:before` for `45deg`, `:after` to `-45deg` and hide bar center using `:background-color` transparent.
- Bonus: You can use JavaScript to manipulate CSS and keep `:X`.

#### Browser support
