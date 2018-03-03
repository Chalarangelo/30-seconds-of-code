### Clearfix

Ensures that an element self-clears its children.

###### Note: This is only useful if you are still using float to build layouts. Please consider using a modern approach with flexbox layout or grid layout.

#### HTML

```html
<div class="clearfix">
  <div class="floated">float a</div>
  <div class="floated">float b</div>
  <div class="floated">float c</div>
</div>
```

#### CSS

```css
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}

.floated {
  float: left;
}
```

#### Demo

<div class="snippet-demo">
  <div class="snippet-demo__clearfix">
    <div class="snippet-demo__floated">float a</div>
    <div class="snippet-demo__floated">float b</div>
    <div class="snippet-demo__floated">float c</div>
  </div>
</div>

<style>
.snippet-demo__clearfix::after {
  content: '';
  display: block;
  clear: both;
}

.snippet-demo__floated {
  float: left;
}
</style>

#### Explanation

1. `.clearfix::after` defines a pseudo-element.
2. `content: ''` allows the pseudo-element to affect layout.
3. `clear: both` indicates that the left, right or both sides of the element cannot be adjacent
   to earlier floated elements within the same block formatting context.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

<!-- tags: layout -->
