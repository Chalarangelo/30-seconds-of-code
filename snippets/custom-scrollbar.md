### Custom scrollbar

Customizes the scrollbar style for the document and elements with scrollable overflow, on WebKit platforms.

#### HTML

```html
<div class="custom-scrollbar">
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />
    Iure id exercitationem nulla qui repellat laborum vitae, <br />
    molestias tempora velit natus. Quas, assumenda nisi. <br />
    Quisquam enim qui iure, consequatur velit sit?
  </p>
</div>
```

#### CSS

```css
.custom-scrollbar {
  height: 70px;
  overflow-y: scroll;
}

/* To style the document scrollbar, remove `.custom-scrollbar` */

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
```

#### Demo

#### Explanation

1. `::-webkit-scrollbar` targets the whole scrollbar element.
2. `::-webkit-scrollbar-track` targets only the scrollbar track.
3. `::-webkit-scrollbar-thumb` targets the scrollbar thumb.

There are many other pseudo-elements that you can use to style scrollbars. For more info, visit the [WebKit Blog](https://webkit.org/blog/363/styling-scrollbars/).

#### Browser support

<span class="snippet__support-note">⚠️ Scrollbar styling doesn't appear to be on any standards track.</span>

- https://caniuse.com/#feat=css-scrollbar

<!-- tags: visual -->
