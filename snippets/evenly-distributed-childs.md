### Evenly distributed childs

Evenly distributed childs within the alignment container

#### HTML

```html
<div class="evenly-distributed-childs">
  <p class="child">Item1</p>
  <p class="child">Item2</p>
  <p class="child">Item3</p>
</div>
```

#### CSS

```css
.evenly-distributed-childs {
  display: flex;
  width: 300px;
  justify-content: space-between;
}
```

#### Demo

<div class="snippet-demo">
  <div class="snippet-demo__evenly-distributed-childs">
    <p class="snippet-demo__evenly-distributed-childs__child">Item1</p>
    <p class="snippet-demo__evenly-distributed-childs__child">Item2</p>
    <p class="snippet-demo__evenly-distributed-childs__child">Item3</p>
  </div>
</div>

<style>
.snippet-demo__evenly-distributed-childs {
  display: flex;
  width: 100%;  
  justify-content: space-between;
}
</style>

#### Explanation

1. `display: flex` enables flexbox.
2. `justify-content: space-between` evenly distributes childs in the line.

First item will be on the start line, last item on the end line

#### Browser support

<span class="snippet__support-note">⚠️ Needs prefixes for full support.</span>

* https://caniuse.com/#feat=flexbox
