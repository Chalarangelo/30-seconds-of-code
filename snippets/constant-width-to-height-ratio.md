### Constant width to height ratio

Given an element of variable width, it will ensure its height remains proportionate in a responsive fashion
(i.e., its width to height ratio remains constant).

#### HTML

```html
<div class="constant-width-to-height-ratio"></div>
```

#### CSS

```css
.constant-width-to-height-ratio {
  background: #333;
  width: 50%;
  padding-top: 50%;
}
```

#### Demo

Resize your browser window to see the proportion of the element remain the same.

<div class="snippet-demo">
  <div class="snippet-demo__constant-width-to-height-ratio"></div>
</div>

<style>
.snippet-demo__constant-width-to-height-ratio {
  background: #333;
  width: 50%;
  padding-top: 50%;
}
</style>

#### Explanation

`padding-top` and `padding-bottom` can be used as an alternative to `height` such that the percentage value
causes an element's height to become a percentage of its parent's width, i.e. `50%` means the height will be 50% of the parent element's width, which means it acts the same as `width`. This allows its proportion to remain constant.

#### Browser support

<span class="snippet__support-note">⚠️ `padding-top` pushes any content within the element to the bottom.</span>
