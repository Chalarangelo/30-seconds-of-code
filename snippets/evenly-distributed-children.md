### Evenly distributed children

Evenly distributes child elements within a parent element.

#### HTML

```html
<div class="evenly-distributed-children">
  <p>Item1</p>
  <p>Item2</p>
  <p>Item3</p>
</div>
```

#### CSS

```css
.evenly-distributed-children {
  display: flex;
  justify-content: space-between;
}
```

#### Demo

#### Explanation

1. `display: flex` enables flexbox.
2. `justify-content: space-between` evenly distributes child elements horizontally. The first item is positioned at the left edge, while the last item is positioned at the right edge.

Alternatively, use `justify-content: space-around` to distribute the children with space around them, rather than between them.

#### Browser support

<span class="snippet__support-note">⚠️ Needs prefixes for full support.</span>

- https://caniuse.com/#feat=flexbox

<!-- tags: layout -->
