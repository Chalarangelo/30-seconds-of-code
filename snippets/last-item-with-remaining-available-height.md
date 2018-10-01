### Last item with remaining available height

Take advantage of available viewport space by giving the last element the remaining available space in current viewport, even when resizing the window.

#### HTML

```html
<div class="container">
  <div>Div 1</div>
  <div>Div 2</div>
  <div>Div 3</div>
</div>
```

#### CSS

```css
html,
body {
  height: 100%;
  margin: 0;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.container > div:last-child {
  background-color: #333;
  flex: 1;
}
```

#### Demo

<div class="snippet-demo">
    <div class="snippet-demo__last-time-with-all-available-height">
        <div>Div 1</div>
        <div>Div 2</div>
        <div>Div 3</div>
    </div>
</div>

<style>
.snippet-demo__last-time-with-all-available-height {
  height: 300px;
  display: flex;
  flex-direction: column;
}

.snippet-demo__last-time-with-all-available-height > div:last-child {
  background-color: #333;
  flex-grow: 1;
  color: white;
}
</style>

#### Explanation

1. `height: 100%` set the height of container as viewport height.
2. `display: flex` enables flexbox.
3. `flex-direction: column` set the direction of flex items' order from top to down.
4. `flex-grow: 1` the flexbox will apply remaining available space of container to last child element.

The parent must have a viewport height. `flex-grow: 1` could be applied to the first or second element, which will have all available space.

#### Browser support

<span class="snippet__support-note">⚠️ Needs prefixes for full support.</span>

* https://caniuse.com/#feat=flexbox

<!-- tags: layout -->
