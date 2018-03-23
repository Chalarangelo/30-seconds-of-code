### Fullscreen

The :fullscreen CSS pseudo-class represents an element that's displayed when the browser is in fullscreen mode.

#### HTML

```html
<div class="container">
  <p><em>Click the button below to enter the element into fullscreen mode. </em></p>
  <div class="element" id="element">
    <p>I'm in fullscreen mode!</p>
  </div>
  <br>
  <button onclick="var el = document.getElementById('element'); el.webkitRequestFullscreen();">Go Full Screen!</button>
</div>
```

#### CSS

```css
.container {
  margin: 40px auto;
  max-width: 700px;
}

.element {
  padding: 20px;
  height: 300px;
  width: 100%;
  background-color: skyblue;
}

.element p {
  text-align: center;
  color: white;
  font-size: 3em;
}

.element:-ms-fullscreen p {
  visibility: visible;
}

.element:fullscreen {
  background-color: #e4708a;
  width: 100vw;
  height: 100vh;
}
```

#### Demo

<div class="snippet-demo">
  <div class="snippet-demo__sinppet-fullscreen">
    <div class="container">
	  <p><em>Click the button below to enter the element into fullscreen mode. </em></p>
	  <div class="element" id="element">
	    <p>I'm in fullscreen mode!</p>
	  </div>
	  <button onclick="var el = document.getElementById('element'); el.webkitRequestFullscreen();">Go Full Screen!</button>
	</div>
  </div>
</div>

<style>
.container {
  margin: 40px auto;
  max-width: 700px;
}

.element {
  padding: 20px;
  height: 300px;
  width: 100%;
  background-color: skyblue;
}

.element p {
  text-align: center;
  color: white;
  font-size: 3em;
}

.element:-ms-fullscreen p {
  visibility: visible;
}

.element:fullscreen {
  background-color: #e4708a;
  width: 100vw;
  height: 100vh;
}
</style>

#### Explanation

1. `fullscreen` CSS pseudo-class selector is used to select and style an element that is being displayed in full-screen mode.

#### Browser support

<span class="snippet__support-note">92%<</span>

* https://developer.mozilla.org/en-US/docs/Web/CSS/:fullscreen

<!-- tags: animation -->
