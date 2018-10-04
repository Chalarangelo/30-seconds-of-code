### Triangle

Creates a triangle shape with pure CSS.

#### HTML

```html
<div class="triangle"></div>
```

#### CSS

```css
.triangle {
  width: 0;
  height: 0;
  border-top: 20px solid #333;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```

#### Demo

#### Explanation

[View this link for a detailed explanation.](https://stackoverflow.com/q/7073484)

The color of the border is the color of the triangle. The side the triangle tip points
corresponds to the opposite `border-*` property. For example, a color on `border-top`
means the arrow points downward.

Experiment with the `px` values to change the proportion of the triangle.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

<!-- tags: visual -->
