---
title: getMousePosition
tags: browser,event,intermediate
---

Returns the mouse position of the current page.

- Use `window.event.pageX` and `window.event.pageY` if they are defined, otherwise `window.event.clientX` and `window.event.clientY`.
- `e` is defined to get `window.event`

```js
const getMousePosition = e => {
	let posX = 0;
	let posY = 0;
	if (!e) e = window.event;
	if (e.pageX || e.pageY) {
		posX = e.pageX;
		posY = e.pageY;
	} else if (e.clientX || e.clientY) {
		posX = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
		posY = e.clientY + body.scrollTop + document.documentElement.scrollTop;
	}
	return { x: posX, y: posY };
};
```

```js
getMousePosition(); // {x: 456, y: 576}
```
