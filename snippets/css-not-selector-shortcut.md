### CSS :not selector shortcut

The `:not` psuedo selector is perfect for styling a group of elements, and leaving the last (or specified) element unstyled without all the lines of code.

#### HTML

```html
<ul class="css-not-selector-shortcut">
  <li class="link"><a href="">Link 1</a></li>
  <li class="link"><a href="">Link 2</a></li>
  <li class="link"><a href="">Link 3</a></li>
  <li class="link"><a href="">Link 4</a></li>
  <li class="link"><a href="">Link 5</a></li>
</ul>
```

#### CSS

```css
li {
  display: inline-block;
  
  list-style-type: none;
  margin: 0;
  padding: .25em 1em;
}

.css-not-selector-shortcut a {
  text-decoration:none;
  color: #111111;
}

.css-not-selector-shortcut li:not(:last-child) {
  border-right: 1px solid #666666;
}
```

#### Demo

<div class="snippet-demo">
  <ul class="snippet-demo__css-not-selector-shortcut">
    <li><a href="">Link 1</a></li>
    <li><a href="">Link 2</a></li>
    <li><a href="">Link 3</a></li>
    <li><a href="">Link 4</a></li>
    <li><a href="">Link 5</a></li>
  </ul>
</div>

<style>
li {
  display: inline-block;
  
  list-style-type: none;
  margin: 0;
  padding: .25em 1em;
}

.css-not-selector-shortcut a {
  text-decoration:none;
  color: #111111;
}

.css-not-selector-shortcut li:not(:last-child) {
  border-right: 1px solid #666666;
}
</style>

#### Explanation

1. Instead of putting on the border and then taking it off:
```css
.css-not-selector-shortcut li {
  border-right: 1px solid #666666;
}

.css-not-selector-shortcut li:last-child {
  border-right: none;
}
```

2. Use the `:not` psuedo selector to save a few lines:
```css
.css-not-selector-shortcut li:not(:last-child) {
  border-right: 1px solid #666666;
}
```

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

* https://caniuse.com/#feat=css-sel3

<!-- tags: visual -->
