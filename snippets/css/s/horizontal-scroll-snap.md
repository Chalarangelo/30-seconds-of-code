---
title: Horizontal scroll snap
type: snippet
language: css
tags: [interactivity]
cover: waves-from-above
dateModified: 2021-10-11T18:44:51+03:00
---

Creates a horizontally scrollable container that will snap on elements when scrolling.

- Use `display: grid` and `grid-auto-flow: column` to create a horizontal layout.
- Use `scroll-snap-type: x mandatory` and `overscroll-behavior-x: contain` to create a snap effect on horizontal scroll.
- Change `scroll-snap-align` to either `start`, `stop` or `center` to change the snap alignment.

```html
<div class="horizontal-snap">
  <a href="#"><img src="https://picsum.photos/id/1067/640/640"></a>
  <a href="#"><img src="https://picsum.photos/id/122/640/640"></a>
  <a href="#"><img src="https://picsum.photos/id/188/640/640"></a>
  <a href="#"><img src="https://picsum.photos/id/249/640/640"></a>
  <a href="#"><img src="https://picsum.photos/id/257/640/640"></a>
  <a href="#"><img src="https://picsum.photos/id/259/640/640"></a>
  <a href="#"><img src="https://picsum.photos/id/283/640/640"></a>
  <a href="#"><img src="https://picsum.photos/id/288/640/640"></a>
  <a href="#"><img src="https://picsum.photos/id/299/640/640"></a>
</div>
```

```css
.horizontal-snap {
  margin: 0 auto;
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
  height: calc(180px + 1rem);
  padding: 1rem;
  max-width: 480px;
  overflow-y: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
}

.horizontal-snap > a {
  scroll-snap-align: center;
}

.horizontal-snap img {
  width: 180px;
  max-width: none;
  object-fit: contain;
  border-radius: 1rem;
}
```
