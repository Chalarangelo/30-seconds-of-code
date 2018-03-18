### Height transition

Transitions an element's height from `0` to `auto` when its height is unknown.

#### HTML

```html
<div class="trigger">
  Hover me to see a height transition.
  <div class="el">content</div>
</div>
```

#### CSS

```css
.el {
  transition: max-height 0.5s;
  overflow: hidden;
  max-height: 0;
}

.trigger:hover > .el {
  max-height: var(--max-height);
}
```

#### JavaScript

```js
var el = document.querySelector('.el')
var height = el.scrollHeight
el.style.setProperty('--max-height', height + 'px')
```

#### Demo

<div class="snippet-demo">
  <div class="snippet-demo__height-transition">
    Hover me to see a height transition.
    <div class="snippet-demo__height-transition__el">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque congue placerat nunc a volutpat. Etiam placerat libero porttitor purus facilisis vehicula. Mauris risus mauris, varius ac consequat eget, iaculis non enim. Proin ut nunc ac massa iaculis sodales id mattis enim. Cras non diam ac quam pharetra fermentum vel ac nulla. Suspendisse ligula urna, porta non lobortis non, lobortis vel velit. Fusce lectus justo, aliquet eu fringilla auctor, sodales eu orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
    </div>
  </div>
</div>

<style>

.snippet-demo__height-transition__el {
  transition: max-height 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
  max-height: 0;
}

.snippet-demo__height-transition:hover > .snippet-demo__height-transition__el {
  max-height: var(--max-height);
}
</style>

<script>
(function () {
  var el = document.querySelector('.snippet-demo__height-transition__el')
  var height = el.scrollHeight
  el.style.setProperty('--max-height', height + 'px')
})()
</script>

#### Explanation

##### CSS

1. `transition: max-height: 0.5s cubic-bezier(...)` specifies that changes to `max-height` should be transitioned over 0.5 seconds, using an `ease-out-quint` timing function.
2. `overflow: hidden` prevents the contents of the hidden element from overflowing its container.
3. `max-height: 0` specifies that the element has no height initially.
4. `.target:hover > .el` specifies that when the parent is hovered over, target a child `.el` within
   it and use the `--max-height` variable which was defined by JavaScript.

##### JavaScript

1. `el.scrollHeight` is the height of the element including overflow, which will change dynamically
   based on the content of the element.
2. `el.style.setProperty(...)` sets the `--max-height` CSS variable which is used to specify the `max-height` of the element the target is hovered over, allowing it to transition smoothly from 0 to auto.

#### Browser Support

<div class="snippet__requires-javascript">Requires JavaScript</div>
<span class="snippet__support-note">
  ⚠️ Causes reflow on each animation frame, which will be laggy if there are a large number of elements
  beneath the element that is transitioning in height.
</span>

* https://caniuse.com/#feat=css-variables
* https://caniuse.com/#feat=css-transitions

<!-- tags: animation -->
