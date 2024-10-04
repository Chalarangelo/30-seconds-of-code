---
title: Show menu on image hover
language: css
tags: [layout,animation]
cover: compass
excerpt: Display a menu overlay when the user hovers over an image.
listed: true
dateModified: 2024-09-24
---

To display a menu overlay when the user hovers over an image, you can use a combination of HTML and CSS techniques. Start by using a `<figure>` element to wrap both the `<img>` element and a `<nav>` element that will contain the menu links. This structure allows you to control the layout and positioning of the image and the menu.

To create a **sliding effect**, use the `opacity` and `right` attributes to animate the image on hover. By adjusting these properties, you can make the image appear to slide to the side, revealing the menu. Additionally, set the `left` attribute of the `<nav>` to the negative of the element's width. When hovering over the parent element, reset the `left` attribute to slide the menu into view.

For the menu items, use `display: flex`, `flex-direction: column`, and `justify-content: center` on the `<nav>` to vertically center them. This ensures that the menu items are evenly spaced and aligned in the center of the menu overlay.

https://codepen.io/chalarangelo/pen/zYgqmQM

```html
<figure class="hover-menu">
	<img src="https://picsum.photos/id/1060/800/480.jpg"/>
	<nav>
		<a href="#">Home</a>
		<a href="#">Pricing</a>
		<a href="#">About</a>
	</nav>
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

.hover-menu nav {
  position: absolute;
  top: 0;
  left: -120px;
  width: 120px;
  height: 100%;
  background: #000;
  transition: 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hover-menu nav a {
  display: block;
  color: #fff;
  opacity: 0.8;
  position: relative;
  transition: 0.3s ease-in-out;
}

.hover-menu:hover img {
  opacity: 0.5;
  right: -120px;
}

.hover-menu:hover nav {
  left: 0;
  opacity: 1;
}
```
