### Shape separator

Uses an SVG shape to separate two different blocks to create more a interesting visual appearance compared to standard horizontal separation.

#### HTML

```html
<div class="shape-separator"></div>
```

#### CSS

```css
.shape-separator {
  position: relative;
  height: 48px;
  background: #333;
}
.shape-separator::after {
  content: '';
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 12'%3E%3Cpath d='m12 0l12 12h-24z' fill='%23fff'/%3E%3C/svg%3E");
  position: absolute;
  width: 100%;
  height: 12px;
  bottom: 0;
}
```

#### Demo

#### Explanation

1. `position: relative` on the element establishes a Cartesian positioning context for pseudo elements.
2. `::after` defines a pseudo element.
3. `background-image: url(...)` adds the SVG shape (a 24x12 triangle) as the background image of the pseudo element, which repeats by default. It must be the same color as the block that is being separated. For other shapes, we can use [the URL-encoder for SVG](http://yoksel.github.io/url-encoder/).
4. `position: absolute` takes the pseudo element out of the flow of the document and positions it in relation to the parent.
5. `width: 100%` ensures the element stretches the entire width of its parent.
6. `height: 12px` is the same height as the shape.
7. `bottom: 0` positions the pseudo element at the bottom of the parent.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

- https://caniuse.com/#feat=svg

<!-- tags: visual -->
