---
title: Custom scrollbar
tags: visual,advanced
---

Customizes the scrollbar style for the an elements with scrollable overflow.

- Use `::-webkit-scrollbar` to style the scrollbar element.
- Use `::-webkit-scrollbar-track` to style the scrollbar track (the background of the scrollbar).
- Use `::-webkit-scrollbar-thumb` to style the scrollbar thumb (the draggable element).
- **Note:** Scrollbar styling doesn't appear to be on any standards track. This technique only works on WebKit-based browsers.

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
