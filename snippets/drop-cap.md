---
title: Drop cap
tags: visual,beginner
---

Makes the first letter of the first paragraph bigger than the rest of the text.

- Use the `:first-child` selector to select only the first paragraph.
- Use the `::first-letter` pseudo-element to style the first element of the paragraph.

```html
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam commodo ligula quis tincidunt cursus. Integer consectetur tempor ex eget hendrerit. Cras facilisis sodales odio nec maximus. Pellentesque lacinia convallis libero, rhoncus tincidunt ante dictum at. Nullam facilisis lectus tellus, sit amet congue erat sodales commodo.</p>
<p>Donec magna erat, imperdiet non odio sed, sodales tempus magna. Integer vitae orci lectus. Nullam consectetur orci at pellentesque efficitur.</p>
```

```css
p:first-child::first-letter {
  color: #5f79ff;
  float: left;
  margin: 0 8px 0 4px;
  font-size: 3rem;
  font-weight: bold;
  line-height: 1;
}
```
