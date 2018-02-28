### Scrollbars styling

Customise scrollbars style for the document and elements with overflow scrollable, on webkit platforms.

#### HTML

```html
<div class="custom-scroll">
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure id exercitationem nulla qui repellat laborum vitae, molestias tempora velit natus. Quas, assumenda nisi. Quisquam enim qui iure, consequatur velit sit?</p>
</div>
```

#### CSS

```css
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
}
```

#### Demo

<div class="snippet-demo">
  <div class="snippet-demo__scrollbars-styling">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure id exercitationem nulla qui repellat laborum vitae, molestias tempora velit natus. Quas, assumenda nisi. Quisquam enim qui iure, consequatur velit sit?
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure id exercitationem nulla qui repellat laborum vitae, molestias tempora velit natus. Quas, assumenda nisi. Quisquam enim qui iure, consequatur velit sit?
    </p>
  </div>
</div>

<style>
.snippet-demo__scrollbars-styling {
  height: 100px;
  overflow: auto;
}

.snippet-demo__scrollbars-styling::-webkit-scrollbar {
  width: 8px;
}

.snippet-demo__scrollbars-styling::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
}

.snippet-demo__scrollbars-styling::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
}
</style>

#### Explanation

1. `::-webkit-scrollbar` target the whole scrollbar element.
2. `::-webkit-scrollbar-track` target only the scrollbar track.
3. `::-webkit-scrollbar-thumb` Allow you to target and style the scrollbar thumb.

There are many other pseudo elements that you can use to style scrollbars. More info about this on the [WebKit Blog](https://webkit.org/blog/363/styling-scrollbars/)

#### Browser support

<span class="snippet__support-note">⚠️ Currently scrollbar styling doesn't appear to be on any standards track.
</span>

* https://caniuse.com/#feat=css-scrollbar
