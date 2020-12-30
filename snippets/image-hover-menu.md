---
title: Menu on image hover
tags: layout,animation,intermediate
---

Displays a menu overlay when the image is hovered.

- Use a `<figure>` to wrap the `<img>` element and a `<div>` element that will contain the menu links.
- Use the `opacity` and `right` attributes to animate the image on hover, creating a sliding effect.
- Set the `left` attribute of the `<div>` to the negative of the element's `width` and reset it to `0` when hovering over the parent element to slide in the menu.
- Use `display: flex`, `flex-direction: column` and `justify-content: center` on the `<div>` to vertically center the menu items.

```html
<figure class="hover-menu">
	<img src="https://picsum.photos/id/1060/800/480.jpg"/>
	<div>
		<a href="#">Home</a>
		<a href="#">Pricing</a>
		<a href="#">About</a>
	</div>
</figure>
```

```css
.hover-menu {
  position: relative;
  overflow: hidden;
  margin: 8px;
  min-width: 340px;
  max-width: 480px;
  max-height: 290px;
  width: 100%;
  background: #000;
  text-align: center;
  box-sizing: border-box;
}

.hover-menu * {
  box-sizing: border-box;
}

.hover-menu img {
  position: relative;
  max-width: 100%;
  top: 0;
  right: 0;
  opacity: 1;
  transition: 0.3s ease-in-out;
}

.hover-menu div {
  position: absolute;
  top: 0;
  left: -120px;
  width: 120px;
  height: 100%;
  padding: 8px 4px;
  background: #000;
  transition: 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hover-menu div a {
  display: block;
  line-height: 2;
  color: #fff;
  text-decoration: none;
  opacity: 0.8;
  padding: 5px 15px;
  position: relative;
  transition: 0.3s ease-in-out;
}

.hover-menu div a:hover {
  text-decoration: underline;
}

.hover-menu:hover img {
  opacity: 0.5;
  right: -120px;
}

.hover-menu:hover div {
  left: 0;
  opacity: 1;
}
```
