### Zebra striped list

Creates a striped list with alternating background colors, which is useful for differentiating siblings that have content spread across a wide row.

#### HTML

```html
<ul>
  <li>Item 01</li>
  <li>Item 02</li>
  <li>Item 03</li>
  <li>Item 04</li>
  <li>Item 05</li>
</ul>
```

#### CSS

```css
li:nth-child(odd) {
  background-color: #eee;
}
```

#### Demo

#### Explanation

1. Use the `:nth-child(odd)` or `:nth-child(even)` pseudo-class to apply a different background color to elements that match based on their position in a group of siblings.

Note that you can use it to apply different styles to other HTML elements like div, tr, p, ol, etc.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

https://caniuse.com/#feat=css-sel3

<!-- tags: visual -->
<!-- date: 2018-10-31 -->
