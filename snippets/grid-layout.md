### Grid layout

Basic website layout using `grid`.

#### HTML

```html
<div class="grid-layout">
  <div class="box header">Header</div>
  <div class="box sidebar">Sidebar</div>
  <div class="box content">Content
    <br /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti modi sed accusamus vero laborum? Ut ducimus doloremque perspiciatis labore velit, nostrum, molestias animi, nulla odit illum voluptas est explicabo non!
  </div>
  <div class="box footer">Footer</div>
</div>
```

#### CSS

```css
.grid-layout {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(3, 1fr);
        grid-template-areas:
        "sidebar header header"
        "sidebar content content"
        "sidebar footer  footer";
}
.sidebar {
    grid-area: sidebar;
}
.content {
    grid-area: content;
}
.header {
    grid-area: header;
}
.footer {
    grid-area: footer;
}
```

#### Demo

<div class="snippet-demo">
  <div class="snippet-demo__grid-layout">
        <div class="box snippet-demo__grid-layout__header">Header</div>
        <div class="box snippet-demo__grid-layout__sidebar">Sidebar</div>
        <div class="box snippet-demo__grid-layout__content">Content
            <br /> Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </div>
        <div class="box snippet-demo__grid-layout__footer">Footer</div>
  </div>
</div>

<style>
.snippet-demo__grid-layout {
        margin: 1em;
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(3, 1fr);
        grid-template-areas:
        "sidebar header header"
        "sidebar content content"
        "sidebar  footer  footer";
        background-color: #fff;
        color: #444;
}
.box {
  background-color: #444;
  color: #fff;
  border-radius: 5px;
  padding: 10px;
  font-size: 150%;
}
.snippet-demo__grid-layout__sidebar {
    grid-area: sidebar;
}
.snippet-demo__grid-layout__content {
    grid-area: content;
}
.snippet-demo__grid-layout__header {
    grid-area: header;
}
.snippet-demo__grid-layout__footer {
    grid-area: footer;
}
</style>

#### Explanation

1. `display: grid` enables grid.
2. `grid-gap: 10px` defines spacing between the elements.
3. `grid-template-columns: repeat(3, 1fr)` defines 3 columns of the same size.
4. `grid-template-areas` defines the names of grid areas.
5. `grid-area: sidebar` makes the element use the area with the name `sidebar`.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

* https://caniuse.com/#feat=css-grid

<!-- tags: layout -->