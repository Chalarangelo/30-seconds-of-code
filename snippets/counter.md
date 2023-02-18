---
title: Counter
tags: visual
cover: laptop-plants
firstSeen: 2018-03-07T22:12:42+02:00
lastUpdated: 2020-12-30T15:37:37+02:00
---

Creates a custom list counter that accounts for nested list elements.

- Use `counter-reset` to initialize a variable counter (default `0`), the name of which is the value of the attribute (i.e. `counter`).
- Use `counter-increment` on the variable counter for each countable element (i.e. each `<li>`).
- Use `counters()` to display the value of each variable counter as part of the `content` of the `::before` pseudo-element for each countable element (i.e. each `<li>`). The second value passed to it (`'.'`) acts as the delimiter for nested counters.

```html
<ul>
  <li>List item</li>
  <li>List item</li>
  <li>
    List item
    <ul>
      <li>List item</li>
      <li>List item</li>
      <li>List item</li>
    </ul>
  </li>
</ul>
```

```css
ul {
  counter-reset: counter;
  list-style: none;
}

li::before {
  counter-increment: counter;
  content: counters(counter, '.') ' ';
}
```
