---
title: Hamburguer Button
tags: interactivity,beginner
---

This is a way to build simple hamburger button for menu bar.

```html
<div class="hb-container">
  <span></span>
  <span></span>
  <span></span>
</div>
```

```css
.hb-container {
  width: 30px;
  height: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.hb-container span {
  width: 30px;
  height: 5px;
  border-radius: 3px;
  margin: 2px 0;
  background-color: #333;
  transition: 0.5s;
}

.hb-container:hover span {
  margin: 0;
}
.hb-container:hover :nth-child(2) {
  opacity: 0;
}
.hb-container:hover :first-child {
  position: absolute;
  transform: rotate(-45deg);
}
.hb-container:hover :last-child {
  position: absolute;
  transform: rotate(45deg);
}
```

#### Explanation

- You need of two ou three `:span` to stack.
- Keep them in rows using `:display-flex`.
- Use `:hover` for rotate first `:span` for `-45deg` and last `45deg`.
- If you use three `:span`, use `:opacity` for hide the middle child of container.
- Bonus: You can use JavaScript to manipulate CSS and keep `:X`.

#### Browser support

- https://caniuse.com/#search=transform
- https://caniuse.com/#search=display%20flex