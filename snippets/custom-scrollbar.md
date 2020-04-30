---
title: Custom scrollbar
tags: visual,advanced
---

Customizes the scrollbar style for the document and elements with scrollable overflow, on WebKit platforms.

- `::-webkit-scrollbar` targets the whole scrollbar element.
- `::-webkit-scrollbar-track` targets only the scrollbar track.
- `::-webkit-scrollbar-thumb` targets the scrollbar thumb.
- Apply the same selectors and styles without `.custom-scrollbar` to style the document scrollbar.
- Scrollbar styling doesn't appear to be on any standards track. There are many other pseudo-elements that you can use to style scrollbars. For more info, visit the [WebKit Blog](https://webkit.org/blog/363/styling-scrollbars/).

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

```css
.custom-scrollbar {
  height: 70px;
  overflow-y: scroll;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #1E3F20;
  border-radius: 12px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #4A7856;
  border-radius: 12px;
}
```
