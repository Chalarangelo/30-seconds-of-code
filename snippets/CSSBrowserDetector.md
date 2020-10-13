---
title: CSSBrowserDetector
tags: css,browser detection,edge,chrome,firefox,ie,internet explorer,intermediate
---

A few browser specific CSS queries for Chrome, Firefox and older versions of Miscrosoft Edge, as well as Internet Explorer 10+.

- We set all of our HTML elements within the `.container` class to `display: none` initially.
- Depending on the feature dectected in the browser, the rendering engine specific classes (`.ie`, `.edge`, `.moz` & `.webkit`) will be displayed with a different color for our `.container` class.
- *A small footnote:* Browser sniffing, if required, is recommended and more reliably done by using Javascript. More can be read [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent).

```html
<div class="container">
  <div class="ie">
    Using IE 10+.
  </div>
  <div class="edge">
    Using Edge 12.
  </div>
  <div class="moz">
    Using Firefox.
  </div>
  <div class="webkit">
    Using Webkit.
  </div>
</div>
```

```css
.ie, .edge, .moz, .webkit {
  display: none;
  text-align: center;
  padding-top: 65px;
}

.container {
  height: 150px;
  width: 150px;
  margin: 100px auto;
}
 
@media all and (-webkit-min-device-pixel-ratio:0) and (min-resolution: .001dpcm) { 
  .container {
    background: pink;
  }  
  .selector:not(*:root), .webkit {
    display: block;
  }
}

@media screen and (min--moz-device-pixel-ratio: 0)  {
  .container {
    background: red;
  }
  .moz {
    display: block;
  }
}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  /* IE10+ CSS */
  .container {
    background: lime;
  }  
  .ie {
    display: block;
  }
}

@supports (-ms-ime-align: auto) {
  /* IE Edge 12+ CSS */
  .container {
    background: cyan;
  } 
  .edge {
    display: block;
  }
}
```
