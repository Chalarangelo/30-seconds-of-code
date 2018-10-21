### Ghost trick

Vertically centering an element in another

#### HTML

```html
<div class="ghosting">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem itaque, natus? Ab aliquid animi asperiores delectus dolor error expedita ipsam iste nihil pariatur provident quae quia, quis soluta suscipit tempora.</p>
</div>
```

#### CSS

```css
.ghosting {
    height: 300px;
    background: #0ff;
}

.ghosting:before {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}

p {
    display: inline-block;
    vertical-align: middle;
}
```

#### Explanation

In some cases you can use this simple method to vertically align inline elements without touching position property.

#### Browser support

- https://caniuse.com/#feat=inline-block

<!-- tags: layout -->
