---
title: Show additional content on hover
tags: visual,intermediate
---

Creates a card that displays additional content on hover.

- Use `overflow: hidden` on the card to hide elements that overflow vertically.
- Use the `:hover` and `:focus-within` pseudo-class selectors to change the card's styling as necessary when it's hovered or it or its contents are focused.
- Set `transition: 0.3s ease all` to create a transition effect on hover/focus.


```html
<div class="card">
  <img src="https://picsum.photos/id/404/367/267"/>
  <h3>Lorem ipsum</h3>
  <div class="focus-content">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/> <a href="#">Link to source</a>
    </p>
  </div>
</div>
```

```css
.card {
  width: 300px;
  height: 280px;
  padding: 0;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  border-radius: 8px;
  box-sizing: border-box;
  overflow: hidden;
}

.card * {
  transition: 0.3s ease all;
}

.card img {
  margin: 0;
  width: 300px;
  height: 224px;
  object-fit: cover;
  display: block;
}

.card h3 {
  margin: 0;
  padding: 12px 12px 48px;
  line-height: 32px;
  font-weight: 500;
  font-size: 20px;
}

.card .focus-content {
  display: block;
  padding: 8px 12px;
}

.card p {
  margin: 0;
  line-height: 1.5;
}

.card:hover img, .card:focus-within img {
  margin-top: -80px;
}

.card:hover h3, .card:focus-within h3 {
  padding: 8px 12px 0;
}
```
