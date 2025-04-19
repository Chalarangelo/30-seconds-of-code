---
title: Creating tabbed content without JavaScript
shortTitle: Details tabbed content
language: css
tags: [interactivity]
cover: flower-portrait-6
excerpt: Leverage modern HTML and CSS capabilities to create a tabbed content component without JavaScript.
listed: true
dateModified: 2025-05-26
---

A few weeks back, I was working on a **tabbed content component** and wondered if I could leverage the `<details>` HTML element to create a more semantic and accessible solution. After some experimentation, I found that it was indeed possible, but there's a small caveat: it needs the `::details-content` pseudo-element to work properly.

<baseline-support featureId="details-content">
</baseline-support>

As you may be aware by now, the `<details>` element creates collapsable sections of content. Adding the same `name` attribute to multiple `<details>` elements allows you to create an accordion-style component. We can build on top of that to create a tabbed content component.

```html
<div class="tabs-container">
  <details name="tabs" open>
    <summary>First tab</summary>
    <div><p>First tab content</p></div>
  </details>
  <details name="tabs">
    <summary>Second tab</summary>
    <div><p>Second tab content</p></div>
  </details>
</div>
```

@[Quick refresher](/html/s/details-accordion)

In order for this trick to work, we'll have to wrap all of our elements in a `<div>` or similar **container** and make it a **grid**. We'll then set up our grid to be `N x 2`, where `N` is the **number of tabs** we want.

```css
.tabs-container {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  /* For 2 tabs, adjust to your needs */
  grid-template-columns: repeat(2, auto);
}
```

The **first row** will contain our tab _handles_ (the `<summary>` elements), and the **second row** will contain the content of each tab. We'll use the appropriate `grid-row` and `grid-column` properties to set these up correctly.

```css
.tabs-container > details > summary {
  grid-row: 1;
}

.tabs-container > details > div {
  grid-column: 1 / -1;
}
```

In order for the open tab to display correctly, we'll need to set the `<details>` element, along with the `::details-content` pseudo-element to `display: contents`. This essentially means that **the element will not generate a box**, but its children will be displayed as if they were direct children of the parent element. This allows us to keep the semantic structure of the HTML while still achieving the desired layout.

```css
.tabs-container > details {
  display: contents;
}

.tabs-container > details[open]::details-content {
  display: contents;
}
```

And that's pretty much all that's needed. Slap a few styles to make it pretty and you've got yourself a **JavaScript-free** tabbed content component.

https://codepen.io/chalarangelo/pen/JoodqXo

```html
<div class="tabs-container">
  <details name="tabs" open>
    <summary>First tab</summary>
    <div><p>First tab content</p></div>
  </details>
  <details name="tabs">
    <summary>Second tab</summary>
    <div><p>Second tab content</p></div>
  </details>
</div>
```

```css
.tabs-container {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: repeat(2, auto);
}

.tabs-container > details {
  display: contents;
}

.tabs-container > details > summary {
  display: flex;
  justify-content: center;
  grid-row: 1;
}

/* Hides the ::marker pseudo-element */
.tabs-container > details > summary::marker {
  display: none;
  content: "";
}

.tabs-container > details > div {
  grid-column: 1 / -1;
}

.tabs-container > details[open]::details-content {
  display: contents;
}
```
