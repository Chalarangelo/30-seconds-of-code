# 30 Seconds of CSS

<a href="https://css.30secondsofcode.org" target="_blank">![logo](https://i.imgur.com/kPMfyD4.jpg)</a>

[![License](https://img.shields.io/badge/license-CC0--1.0-blue.svg)](https://github.com/30-seconds/30-seconds-of-css/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com) [![Insight.io](https://img.shields.io/badge/insight.io-Ready-brightgreen.svg)](https://insight.io/github.com/30-seconds/30-seconds-of-css/tree/master/?source=0)

A curated collection of useful CSS snippets you can understand in 30 seconds or less.
Inspired by [30 seconds of code](https://github.com/30-seconds/30-seconds-of-code).

## View online

https://css.30secondsofcode.org

## Contributing

See CONTRIBUTING.md for the snippet template.

#### Related projects

- [30 Seconds of Code](https://30secondsofcode.org/)
- [30 Seconds of Interviews](https://30secondsofinterviews.org/)
- [30 Seconds of React](https://github.com/30-seconds/30-seconds-of-react)

###  Animation

<details>
<summary>View contents</summary>

* [`Bouncing loader`](#bouncing-loader)
* [`Button border animation`](#button-border-animation)
* [`Donut spinner`](#donut-spinner)
* [`Easing variables`](#easing-variables)
* [`Height transition`](#height-transition)
* [`Hover shadow box animation`](#hover-shadow-box-animation)
* [`Hover underline animation`](#hover-underline-animation)
* [`Pulse loader`](#pulse-loader)

</details>

###  Interactivity

<details>
<summary>View contents</summary>

* [`Disable selection`](#disable-selection)
* [`Hamburguer Button`](#hamburguer-button)
* [`Popout menu`](#popout-menu)
* [`Sibling fade`](#sibling-fade)

</details>

###  Layout

<details>
<summary>View contents</summary>

* [`Box-sizing reset`](#box-sizing-reset)
* [`Clearfix`](#clearfix)
* [`Constant width to height ratio`](#constant-width-to-height-ratio)
* [`Display table centering`](#display-table-centering)
* [`Evenly distributed children`](#evenly-distributed-children)
* [`Fit image in container`](#fit-image-in-container)
* [`Flexbox centering`](#flexbox-centering)
* [`Ghost trick`](#ghost-trick)
* [`Grid centering`](#grid-centering)
* [`Last item with remaining available height`](#last-item-with-remaining-available-height)
* [`Lobotomized Owl Selector`](#lobotomized-owl-selector)
* [`Offscreen`](#offscreen)
* [`3-tile layout`](#3-tile-layout)
* [`Transform centering`](#transform-centering)
* [`Truncate text multiline`](#truncate-text-multiline)
* [`Truncate text`](#truncate-text)

</details>

###  Other

<details>
<summary>View contents</summary>

* [`Calc()`](#calc)
* [`Custom variables`](#custom-variables)

</details>

###  Visual

<details>
<summary>View contents</summary>

* [`Border with top triangle`](#border-with-top-triangle)
* [`Circle`](#circle)
* [`Counter`](#counter)
* [`Custom scrollbar`](#custom-scrollbar)
* [`Custom text selection`](#custom-text-selection)
* [`Drop cap`](#drop-cap)
* [`Dynamic shadow`](#dynamic-shadow)
* [`Etched text`](#etched-text)
* [`Focus Within`](#focus-within)
* [`Fullscreen`](#fullscreen)
* [`Gradient text`](#gradient-text)
* [`Hairline border`](#hairline-border)
* [`Mouse cursor gradient tracking`](#mouse-cursor-gradient-tracking)
* [`Navigation list item hover and focus effect`](#navigation-list-item-hover-and-focus-effect)
* [`:not selector`](#not-selector)
* [`Overflow scroll gradient`](#overflow-scroll-gradient)
* [`Pretty text underline`](#pretty-text-underline)
* [`Reset all styles`](#reset-all-styles)
* [`Shape separator`](#shape-separator)
* [`System font stack`](#system-font-stack)
* [`Toggle switch`](#toggle-switch)
* [`Triangle`](#triangle)
* [`Zebra striped list`](#zebra-striped-list)

</details>


---

##  Animation


### Bouncing loader

Creates a bouncing loader animation.

```html
<div class="bouncing-loader">
  <div></div>
  <div></div>
  <div></div>
</div>
```

```css
@keyframes bouncing-loader {
  to {
    opacity: 0.1;
    transform: translate3d(0, -1rem, 0);
  }
}
.bouncing-loader {
  display: flex;
  justify-content: center;
}
.bouncing-loader > div {
  width: 1rem;
  height: 1rem;
  margin: 3rem 0.2rem;
  background: #8385aa;
  border-radius: 50%;
  animation: bouncing-loader 0.6s infinite alternate;
}
.bouncing-loader > div:nth-child(2) {
  animation-delay: 0.2s;
}
.bouncing-loader > div:nth-child(3) {
  animation-delay: 0.4s;
}
```


#### Explanation


Note: `1rem` is usually `16px`.

1. `@keyframes` defines an animation that has two states, where the element changes `opacity` and is translated up on the 2D plane using `transform: translate3d()`. Using a single axis translation on `transform: translate3d()` improves the performance of the animation.
2. `.bouncing-loader` is the parent container of the bouncing circles and uses `display: flex` and `justify-content: center` to position them in the center.
3. `.bouncing-loader > div`, targets the three child `div`s of the parent to be styled. The `div`s are given a width and height of `1rem`, using `border-radius: 50%` to turn them from squares to circles.
4. `margin: 3rem 0.2rem` specifies that each circle has a top/bottom margin of `3rem` and left/right margin of `0.2rem` so that they do not directly touch each other, giving them some breathing room.
5. `animation` is a shorthand property for the various animation properties: `animation-name`, `animation-duration`, `animation-iteration-count`, `animation-direction` are used.
6. `nth-child(n)` targets the element which is the nth child of its parent.
7. `animation-delay` is used on the second and third `div` respectively, so that each element does not start the animation at the same time.


#### Browser support

100.0%

- https://caniuse.com/#feat=css-animation

<br>[⬆ Back to top](#contents)

### Button border animation

Creates a border animation on hover.

```html
<div class="button-border"><button class="button">Submit</button></div>
```

```css
.button {
  background-color: #c47135;
  border: none;
  color: #ffffff;
  outline: none;
  padding: 12px 40px 10px;
  position: relative;
}
.button:before,
.button:after {
  border: 0 solid transparent;
  transition: all 0.25s;
  content: '';
  height: 24px;
  position: absolute;
  width: 24px;
}
.button:before {
  border-top: 2px solid #c47135;
  left: 0px;
  top: -5px;
}
.button:after {
  border-bottom: 2px solid #c47135;
  bottom: -5px;
  right: 0px;
}
.button:hover {
  background-color: #c47135;
}
.button:hover:before,
.button:hover:after {
  height: 100%;
  width: 100%;
}
```


#### Explanation


- Use the `:before` and `:after` pseduo-elements as borders that animate on hover.


#### Browser support

100.0%

<br>[⬆ Back to top](#contents)

### Donut spinner

Creates a donut spinner that can be used to indicate the loading of content.

```html
<div class="donut"></div>
```

```css
@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.donut {
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7983ff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: donut-spin 1.2s linear infinite;
}
```


#### Explanation


- Use a semi-transparent `border` for the whole element, except one side that will serve as the loading indicator for the donut. Use `animation` to rotate the element.


#### Browser support

100.0%

<span class="snippet__support-note">⚠️ Requires prefixes for full support.</span>

- https://caniuse.com/#feat=css-animation
- https://caniuse.com/#feat=transforms2d

<br>[⬆ Back to top](#contents)

### Easing variables

Variables that can be reused for `transition-timing-function` properties, more
powerful than the built-in `ease`, `ease-in`, `ease-out` and `ease-in-out`.

```html
<div class="easing-variables">Hover</div>
```

```css
:root {
  /* Place variables in here to use globally */
}

.easing-variables {
  --ease-in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
  --ease-in-cubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  --ease-in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22);
  --ease-in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  --ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
  --ease-in-circ: cubic-bezier(0.6, 0.04, 0.98, 0.335);

  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
  --ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-out-circ: cubic-bezier(0.075, 0.82, 0.165, 1);

  --ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  --ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
  --ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-in-out-quint: cubic-bezier(0.86, 0, 0.07, 1);
  --ease-in-out-expo: cubic-bezier(1, 0, 0, 1);
  --ease-in-out-circ: cubic-bezier(0.785, 0.135, 0.15, 0.86);
  display: inline-block;
  width: 75px;
  height: 75px;
  padding: 10px;
  color: white;
  line-height: 50px;
  text-align: center;
  background: #333;
  transition: transform 1s var(--ease-out-quart);
}

.easing-variables:hover {
  transform: rotate(45deg);
}
```


#### Explanation


- The variables are defined globally within the `:root` CSS pseudo-class which matches the root element of a tree representing the document.
- In HTML, `:root` represents the `<html>` element and is identical to the selector `html`, except that its specificity is higher.


#### Browser support

96.5%

- https://caniuse.com/#feat=css-variables

<br>[⬆ Back to top](#contents)

### Height transition

Transitions an element's height from `0` to `auto` when its height is unknown.

```html
<div class="trigger">
  Hover me to see a height transition.
  <div class="el">content</div>
</div>
```

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

```js
var el = document.querySelector('.el')
var height = el.scrollHeight
el.style.setProperty('--max-height', height + 'px')
```


#### Explanation


1. `transition: max-height: 0.5s cubic-bezier(...)` specifies that changes to `max-height` should be transitioned over 0.5 seconds, using an `ease-out-quint` timing function.
2. `overflow: hidden` prevents the contents of the hidden element from overflowing its container.
3. `max-height: 0` specifies that the element has no height initially.
4. `.target:hover > .el` specifies that when the parent is hovered over, target a child `.el` within it and use the `--max-height` variable which was defined by JavaScript.

---

1. `el.scrollHeight` is the height of the element including overflow, which will change dynamically based on the content of the element.
2. `el.style.setProperty(...)` sets the `--max-height` CSS variable which is used to specify the `max-height` of the element the target is hovered over, allowing it to transition smoothly from 0 to auto.


#### Browser support

96.5%

<div class="snippet__requires-javascript">Requires JavaScript</div>
<span class="snippet__support-note">
  ⚠️ Causes reflow on each animation frame, which will be laggy if there are a large number of elements
  beneath the element that is transitioning in height.
</span>

- https://caniuse.com/#feat=css-variables
- https://caniuse.com/#feat=css-transitions

<br>[⬆ Back to top](#contents)

### Hover shadow box animation

Creates a shadow box around the text when it is hovered.

```html
<p class="hover-shadow-box-animation">Box it!</p>
```

```css
.hover-shadow-box-animation {
  display: inline-block;
  vertical-align: middle;
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  margin: 10px;
  transition-duration: 0.3s;
  transition-property: box-shadow, transform;
}
.hover-shadow-box-animation:hover,
.hover-shadow-box-animation:focus,
.hover-shadow-box-animation:active {
  box-shadow: 1px 10px 10px -10px rgba(0, 0, 24, 0.5);
  transform: scale(1.2);
}
```


#### Explanation


1. `display: inline-block` to set width and length for `p` element thus making it an `inline-block`.
2. Set `transform: perspective(1px)` to give element a 3D space by affecting the distance between the Z plane and the user and `translate(0)` to reposition the `p` element along z-axis in 3D space.
3. `box-shadow:` to set up the box.
4. `transparent` to make box transparent.
5. `transition-property` to enable transitions for both `box-shadow` and `transform`.
6. `:hover` to activate whole css when hovering is done until `active`.
7. `transform: scale(1.2)` to change the scale, magnifying the text.


#### Browser support

100.0%

- https://caniuse.com/#feat=transforms3d
- https://caniuse.com/#feat=css-transitions

<br>[⬆ Back to top](#contents)

### Hover underline animation

Creates an animated underline effect when the text is hovered over.

<small>**Credit:** https://flatuicolors.com/</small>

```html
<p class="hover-underline-animation">Hover this text to see the effect!</p>
```

```css
.hover-underline-animation {
  display: inline-block;
  position: relative;
  color: #0087ca;
}
.hover-underline-animation::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #0087ca;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}
.hover-underline-animation:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
```


#### Explanation


1. `display: inline-block` makes the block `p` an `inline-block` to prevent the underline from spanning the entire parent width rather than just the content (text).
2. `position: relative` on the element establishes a Cartesian positioning context for pseudo-elements.
3. `::after` defines a pseudo-element.
4. `position: absolute` takes the pseudo element out of the flow of the document and positions it in relation to the parent.
5. `width: 100%` ensures the pseudo-element spans the entire width of the text block.
6. `transform: scaleX(0)` initially scales the pseudo element to 0 so it has no width and is not visible.
7. `bottom: 0` and `left: 0` position it to the bottom left of the block.
8. `transition: transform 0.25s ease-out` means changes to `transform` will be transitioned over 0.25 seconds with an `ease-out` timing function.
9. `transform-origin: bottom right` means the transform anchor point is positioned at the bottom right of the block.
10. `:hover::after` then uses `scaleX(1)` to transition the width to 100%, then changes the `transform-origin` to `bottom left` so that the anchor point is reversed, allowing it transition out in the other direction when hovered off.


#### Browser support

100.0%

- https://caniuse.com/#feat=transforms2d
- https://caniuse.com/#feat=css-transitions

<br>[⬆ Back to top](#contents)

### Pulse loader

Creates a pulse effect loader animation using the `animation-delay` property.

```html
<div class="ripple-loader">
  <div></div>
  <div></div>
</div>
```

```css
.ripple-loader {
  position: relative;
  width: 64px;
  height: 64px;
}

.ripple-loader div {
  position: absolute;
  border: 4px solid #76ff03;
  border-radius: 50%;
  animation: ripple-loader 1s ease-out infinite;
}

.ripple-loader div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes ripple-loader {
  0% {
    top: 32px;
    left: 32px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0;
    left: 0;
    width: 64px;
    height: 64px;
    opacity: 0;
  }
}
```


#### Explanation


- Use `@keyframes` to define an animation at two points in the cycle, start (`0%`), where the two `<div>` elements have no `width` or `height` and are positioned at the center and end (`100%`), where both `<div>` elements have increased `width` and `height`, but their `position` is reset to `0`.
- Use `opacity` to transition from `1` to `0` when animating to give the `<div>` elements a disappearing effect as they expand.
- `.ripple-loader`, which is the parent container, has a predefined `width` and `height`. It uses `position: relative` to position its children.
- Use `animation-delay` on the second `<div>` element, so that each element starts its animation at a different time.


#### Browser support

100.0%

- https://caniuse.com/#feat=css-animation

<br>[⬆ Back to top](#contents)

---

##  Interactivity


### Disable selection

Makes the content unselectable.

```html
<p>You can select me.</p>
<p class="unselectable">You can't select me!</p>
```

```css
.unselectable {
  user-select: none;
}
```


#### Explanation


- `user-select: none` specifies that the text cannot be selected.


#### Browser support

97.5%

<span class="snippet__support-note">⚠️ Requires prefixes for full support.</span>
<br>
<span class="snippet__support-note">⚠️ This is not a secure method to prevent users from copying content.</span>

- https://caniuse.com/#feat=user-select-none

<br>[⬆ Back to top](#contents)

### Hamburguer Button

This is a way to build simple hamburger button for menu bar.

```html
<button class="hb"></button>
```

```css
.hb,
.hb:before,
.hb:after {
  position: relative;
  width: 30px;
  height: 5px;
  border: none;
  outline: none;
  background-color: #333;
  border-radius: 3px;
  transition: 0.5s;
  cursor: pointer;
}

.hb:before,
.hb:after {
  content: '';
  position: absolute;
  top: -7.5px;
  left: 0;
}

.hb:after {
  top: 7.5px;
}

.hb:hover {
  background-color: transparent;
}

.hb:hover:before,
.hb:hover:after {
  top: 0;
}

.hb:hover::before {
  transform: rotate(45deg);
}

.hb:hover::after {
  transform: rotate(-45deg);
}
```


#### Explanation


- Use a `<button>` element for the middle bar of the hamburger icon.
- Use the `::before` and `::after` pseudo-elements to create the top and bottom bars of the icon.
- Use `position: relative` on the `<button>` and `position: absolute` on the pseudo-elements to place them appropriately.
- Use the `:hover` pseudo-selector to rotate `:before` to `45deg` and `:after` to `-45deg` and hide the center bar using`:background-color` transparent.


#### Browser support

100.0%

<br>[⬆ Back to top](#contents)

### Popout menu

Reveals an interactive popout menu on hover and focus.

```html
<div class="reference" tabindex="0"><div class="popout-menu">Popout menu</div></div>
```

```css
.reference {
  position: relative;
  background: tomato;
  width: 100px;
  height: 100px;
}
.popout-menu {
  position: absolute;
  visibility: hidden;
  left: 100%;
  background: #333;
  color: white;
  padding: 15px;
}
.reference:hover > .popout-menu,
.reference:focus > .popout-menu,
.reference:focus-within > .popout-menu {
  visibility: visible;
}
```


#### Explanation


1. `position: relative` on the reference parent establishes a Cartesian positioning context for its child.
2. `position: absolute` takes the popout menu out of the flow of the document and positions it in relation to the parent.
3. `left: 100%` moves the the popout menu 100% of its parent's width from the left.
4. `visibility: hidden` hides the popout menu initially and allows for transitions (unlike `display: none`).
5. `.reference:hover > .popout-menu` means that when `.reference` is hovered over, select immediate children with a class of `.popout-menu` and change their `visibility` to `visible`, which shows the popout.
6. `.reference:focus > .popout-menu` means that when `.reference` is focused, the popout would be shown.
7. `.reference:focus-within > .popout-menu` ensures that the popout is shown when the focus is _within_ the reference.


#### Browser support

100.0%

<br>[⬆ Back to top](#contents)

### Sibling fade

Fades out the siblings of a hovered item.

```html
<div class="sibling-fade">
  <span>Item 1</span> <span>Item 2</span> <span>Item 3</span> <span>Item 4</span>
  <span>Item 5</span> <span>Item 6</span>
</div>
```

```css
span {
  padding: 0 1rem;
  transition: opacity 0.2s;
}

.sibling-fade:hover span:not(:hover) {
  opacity: 0.5;
}
```


#### Explanation


1. `transition: opacity 0.2s` specifies that changes to opacity will be transitioned over 0.2 seconds.
2. `.sibling-fade:hover span:not(:hover)` specifies that when the parent is hovered, select any `span` children that are not currently being hovered and change their opacity to `0.5`.


#### Browser support

100.0%

- https://caniuse.com/#feat=css-sel3
- https://caniuse.com/#feat=css-transitions

<br>[⬆ Back to top](#contents)

---

##  Layout


### Box-sizing reset

Resets the box-model so that `width`s and `height`s are not affected by their `border`s or `padding`.

```html
<div class="box">border-box</div>
<div class="box content-box">content-box</div>
```

```css
html {
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
.box {
  display: inline-block;
  width: 150px;
  height: 150px;
  padding: 10px;
  background: tomato;
  color: white;
  border: 10px solid red;
}
.content-box {
  box-sizing: content-box;
}
```


#### Explanation


1. `box-sizing: border-box` makes the addition of `padding` or `border`s not affect an element's `width` or `height`.
2. `box-sizing: inherit` makes an element respect its parent's `box-sizing` rule.


#### Browser support

100.0%

- https://caniuse.com/#feat=css3-boxsizing

<br>[⬆ Back to top](#contents)

### Clearfix

Ensures that an element self-clears its children.

###### Note: This is only useful if you are still using float to build layouts. Please consider using a modern approach with flexbox layout or grid layout.

```html
<div class="clearfix">
  <div class="floated">float a</div>
  <div class="floated">float b</div>
  <div class="floated">float c</div>
</div>
```

```css
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}

.floated {
  float: left;
}
```


#### Explanation


1. `.clearfix::after` defines a pseudo-element.
2. `content: ''` allows the pseudo-element to affect layout.
3. `clear: both` indicates that the left, right or both sides of the element cannot be adjacent to earlier floated elements within the same block formatting context.


#### Browser support

100.0%

<span class="snippet__support-note">⚠️ For this snippet to work properly you need to ensure that there are no non-floating children in the container and that there are no tall floats before the clearfixed container but in the same formatting context (e.g. floated columns).</span>

<br>[⬆ Back to top](#contents)

### Constant width to height ratio

Given an element of variable width, it will ensure its height remains proportionate in a responsive fashion
(i.e., its width to height ratio remains constant).

```html
<div class="constant-width-to-height-ratio"></div>
```

```css
.constant-width-to-height-ratio {
  background: #333;
  width: 50%;
}
.constant-width-to-height-ratio::before {
  content: '';
  padding-top: 100%;
  float: left;
}
.constant-width-to-height-ratio::after {
  content: '';
  display: block;
  clear: both;
}
```


#### Explanation


- `padding-top` on the `::before` pseudo-element causes the height of the element to equal a percentage of its width. `100%` therefore means the element's height will always be `100%` of the width, creating a responsive square.
- This method also allows content to be placed inside the element normally.


#### Browser support

100.0%

<br>[⬆ Back to top](#contents)

### Display table centering

Vertically and horizontally centers a child element within its parent element using `display: table` (as an alternative to `flexbox`).

```html
<div class="container">
  <div class="center"><span>Centered content</span></div>
</div>
```

```css
.container {
  border: 1px solid #333;
  height: 250px;
  width: 250px;
}

.center {
  display: table;
  height: 100%;
  width: 100%;
}

.center > span {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
```


#### Explanation


1. `display: table` on '.center' allows the element to behave like a `<table>` HTML element.
2. 100% height and width on '.center' allows the element to fill the available space within its parent element.
3. `display: table-cell` on '.center > span' allows the element to behave like an <td> HTML element.
4. `text-align: center` on '.center > span' centers the child element horizontally.
5. `vertical-align: middle` on '.center > span' centers the child element vertically.

- The outer parent ('.container' in this case) must have a fixed height and width.


#### Browser support

100.0%

- https://caniuse.com/#search=display%3A%20table

<br>[⬆ Back to top](#contents)

### Evenly distributed children

Evenly distributes child elements within a parent element.

```html
<div class="evenly-distributed-children">
  <p>Item1</p>
  <p>Item2</p>
  <p>Item3</p>
</div>
```

```css
.evenly-distributed-children {
  display: flex;
  justify-content: space-between;
}
```


#### Explanation


1. `display: flex` enables flexbox.
2. `justify-content: space-between` evenly distributes child elements horizontally. The first item is positioned at the left edge, while the last item is positioned at the right edge.

- Alternatively, use `justify-content: space-around` to distribute the children with space around them, rather than between them.


#### Browser support

100.0%

<span class="snippet__support-note">⚠️ Needs prefixes for full support.</span>

- https://caniuse.com/#feat=flexbox

<br>[⬆ Back to top](#contents)

### Fit image in container

Changes the fit and position of an image within its container while preserving its aspect ratio. Previously only possible using a background image and the `background-size` property.

```html
<img class="image image-contain" src="https://picsum.photos/600/200" />
<img class="image image-cover" src="https://picsum.photos/600/200" />
```

```css
.image {
  background: #34495e;
  border: 1px solid #34495e;
  width: 200px;
  height: 200px;
}

.image-contain {
  object-fit: contain;
  object-position: center;
}

.image-cover {
  object-fit: cover;
  object-position: right top;
}
```


#### Explanation


- `object-fit: contain` fits the entire image within the container while preserving its aspect ratio.
- `object-fit: cover` fills the container with the image while preserving its aspect ratio.
- `object-position: [x] [y]` positions the image within the container.


#### Browser support

99.5%

- https://caniuse.com/#feat=object-fit

<br>[⬆ Back to top](#contents)

### Flexbox centering

Horizontally and vertically centers a child element within a parent element using `flexbox`.

```html
<div class="flexbox-centering"><div class="child">Centered content.</div></div>
```

```css
.flexbox-centering {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
```


#### Explanation


1. `display: flex` enables flexbox.
2. `justify-content: center` centers the child horizontally.
3. `align-items: center` centers the child vertically.


#### Browser support

100.0%

<span class="snippet__support-note">⚠️ Needs prefixes for full support.</span>

- https://caniuse.com/#feat=flexbox

<br>[⬆ Back to top](#contents)

### Ghost trick

Vertically centers an element in another.

```html
<div class="ghost-trick">
  <div class="ghosting"><p>Vertically centered without changing the position property.</p></div>
</div>
```

```css
.ghosting {
  height: 300px;
  background: #0ff;
}

.ghosting:before {
  content: '';
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


- Use the style of a `:before` pseudo-element to vertically align inline elements without changing their `position` property.


#### Browser support

100.0%

- https://caniuse.com/#feat=inline-block

<br>[⬆ Back to top](#contents)

### Grid centering

Horizontally and vertically centers a child element within a parent element using `grid`.

```html
<div class="grid-centering"><div class="child">Centered content.</div></div>
```

```css
.grid-centering {
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100px;
}
```


#### Explanation


1. `display: grid` enables grid.
2. `justify-content: center` centers the child horizontally.
3. `align-items: center` centers the child vertically.


#### Browser support

97.3%

- https://caniuse.com/#feat=css-grid

<br>[⬆ Back to top](#contents)

### Last item with remaining available height

Take advantage of available viewport space by giving the last element the remaining available space in current viewport, even when resizing the window.

```html
<div class="container">
  <div>Div 1</div>
  <div>Div 2</div>
  <div>Div 3</div>
</div>
```

```css
html,
body {
  height: 100%;
  margin: 0;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.container > div:last-child {
  background-color: tomato;
  flex: 1;
}
```


#### Explanation


1. `height: 100%` set the height of container as viewport height.
2. `display: flex` enables flexbox.
3. `flex-direction: column` set the direction of flex items' order from top to down.
4. `flex-grow: 1` the flexbox will apply remaining available space of container to last child element.

- The parent must have a viewport height. `flex-grow: 1` could be applied to the first or second element, which will have all available space.


#### Browser support

100.0%

<span class="snippet__support-note">⚠️ Needs prefixes for full support.</span>

- https://caniuse.com/#feat=flexbox

<br>[⬆ Back to top](#contents)

### Lobotomized Owl Selector

Sets an automatically inherited margin for all elements that follow other elements in the document.

```html
<div>
  <div>Parent 01</div>
  <div>Parent 02
    <div>Child 01</div>
    <div>Child 02</div>
  </div>
  <div>Parent 03</div>
</div>
```

```css
* + * {
  margin-top: 1.5em;
}
```


#### Explanation


- [View this link for a detailed explanation.](https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/)
- In this example, all elements in the flow of the document that follow other elements will receive `margin-top: 1.5em`.
- This example assumes that the paragraphs' `font-size` is 1em and its `line-height` is 1.5.


#### Browser support

100.0%

<br>[⬆ Back to top](#contents)

### Offscreen

A bulletproof way to completely hide an element visually and positionally in the DOM while still allowing it to be accessed by JavaScript and readable by screen readers. This method is very useful for accessibility ([ADA](https://adata.org/learn-about-ada)) development when more context is needed for visually-impaired users. As an alternative to `display: none` which is not readable by screen readers or `visibility: hidden` which takes up physical space in the DOM.

```html
<a class="button" href="http://pantswebsite.com">
  Learn More <span class="offscreen"> about pants</span>
</a>
```

```css
.offscreen {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
```


#### Explanation


1. Remove all borders.
2. Use `clip` to indicate that no part of the element should be shown.
3. Make the height and width of the element 1px.
4. Negate the elements height and width using `margin: -1px`.
5. Hide the element's overflow.
6. Remove all padding.
7. Position the element absolutely so that it does not take up space in the DOM.


#### Browser support

100.0%

(Although `clip` technically has been depreciated, the newer `clip-path` currently has very limited browser support.)

- https://caniuse.com/#search=clip

<br>[⬆ Back to top](#contents)

### 3-tile layout

Align items horizontally using `display: inline-block` to create a 3-tile layout.

```html
<div class="tiles">
  <div class="tile">
    <img class="tile_image" src="https://via.placeholder.com/250x150" alt="placeholder" >
    <h2 class="tile_title">30 Seconds of CSS</h2>
  </div>
  <div class="tile">
    <img class="tile_image" src="https://via.placeholder.com/250x150" alt="placeholder" >
    <h2 class="tile_title">30 Seconds of CSS</h2>
  </div>
  <div class="tile">
    <img class="tile_image" src="https://via.placeholder.com/250x150" alt="placeholder" >
    <h2 class="tile_title">30 Seconds of CSS</h2>
  </div>
</div>
```

```css
.tiles {
  width: 900px;
  font-size: 0;
}

.tile {
  width: calc(900px / 3);
  display: inline-block;
}

.tile h2 {
  font-size: 20px;
}
```


#### Explanation


- Use `display: inline-block` to create a tiled layout, without using `float`, `flex` or `grid`.
- `.tiles` is the container component, `.tile` is an item that needs to be displayed inline.
- Use `width: calc((900px / 3))` to divide the width of the container evenly into 3 columns.
- Set `font-size: 0;` on `.tiles` to avoid whitespace.
- Set `font-size: 20px` to `h2` in order to display the text.


#### Browser support

100.0%

- https://www.caniuse.com/#search=inline-block

<br>[⬆ Back to top](#contents)

### Transform centering

Vertically and horizontally centers a child element within its parent element using `position: absolute` and `transform: translate()` (as an alternative to `flexbox` or `display: table`). Similar to `flexbox`, this method does not require you to know the height or width of your parent or child so it is ideal for responsive applications.

```html
<div class="parent"><div class="child">Centered content</div></div>
```

```css
.parent {
  border: 1px solid #333;
  height: 250px;
  position: relative;
  width: 250px;
}

.child {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
```


#### Explanation


1. `position: absolute` on the child element allows it to be positioned based on its containing block.
2. `left: 50%` and `top: 50%` offsets the child 50% from the left and top edge of its containing block.
3. `transform: translate(-50%, -50%)` allows the height and width of the child element to be negated so that it is vertically and horizontally centered.

- Note: that the fixed height and width on parent element is for the demo only.


#### Browser support

100.0%

<span class="snippet__support-note">⚠️ Requires prefix for full support.</span>

- https://caniuse.com/#feat=transforms2d

<br>[⬆ Back to top](#contents)

### Truncate text multiline

If the text is longer than one line, it will be truncated for `n` lines and end with an gradient fade.

```html
<p class="truncate-text-multiline">
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
  labore et.
</p>
```

```css
.truncate-text-multiline {
  overflow: hidden;
  display: block;
  height: 109.2px;
  margin: 0 auto;
  font-size: 26px;
  line-height: 1.4;
  width: 400px;
  position: relative;
}

.truncate-text-multiline:after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 150px;
  height: 36.4px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), #f5f6f9 50%);
}
```


#### Explanation


1. `overflow: hidden` prevents the text from overflowing its dimensions (for a block, 100% width and auto height).
2. `width: 400px` ensures the element has a dimension.
3. `height: 109.2px` calculated value for height, it equals `font-size * line-height * numberOfLines` (in this case `26 * 1.4 * 3 = 109.2`)
4. `height: 36.4px` calculated value for gradient container, it equals `font-size * line-height` (in this case `26 * 1.4 = 36.4`)
5. `background: linear-gradient(to right, rgba(0, 0, 0, 0), #f5f6f9 50%)` gradient from `transparent` to `#f5f6f9`


#### Browser support

100.0%

- https://caniuse.com/#feat=css-gradients

<br>[⬆ Back to top](#contents)

### Truncate text

If the text is longer than one line, it will be truncated and end with an ellipsis `…`.

```html
<p class="truncate-text">If I exceed one line's width, I will be truncated.</p>
```

```css
.truncate-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 200px;
}
```


#### Explanation


1. `overflow: hidden` prevents the text from overflowing its dimensions (for a block, 100% width and auto height).
2. `white-space: nowrap` prevents the text from exceeding one line in height.
3. `text-overflow: ellipsis` makes it so that if the text exceeds its dimensions, it will end with an ellipsis.
4. `width: 200px;` ensures the element has a dimension, to know when to get ellipsis


#### Browser support

100.0%

<span class="snippet__support-note">⚠️ Only works for single line elements.</span>

- https://caniuse.com/#feat=text-overflow

<br>[⬆ Back to top](#contents)

---

##  Other


### Calc()

The function calc() allows to define CSS values with the use of mathematical expressions, the value adopted for the property is the result of a mathematical expression.

```html
<div class="box-example"></div>
```

```css
.box-example {
  height: 280px;
  background: #222 url('https://image.ibb.co/fUL9nS/wolf.png') no-repeat;
  background-position: calc(100% - 20px) calc(100% - 20px);
}
```


#### Explanation


1. It allows addition, subtraction, multiplication and division.
2. Can use different units (pixel and percent together, for example) for each value in your expression.
3. It is permitted to nest calc() functions.
4. It can be used in any property that `<length>`, `<frequency>`, `<angle>`, `<time>`, `<number>`, `<color>`, or `<integer>` is allowed, like width, height, font-size, top, left, etc.


#### Browser support

100.0%

- https://caniuse.com/#feat=calc

<br>[⬆ Back to top](#contents)

### Custom variables

CSS variables that contain specific values to be reused throughout a document.

```html
<p class="custom-variables">CSS is awesome!</p>
```

```css
:root {
  /* Place variables within here to use the variables globally. */
}

.custom-variables {
  --some-color: #da7800;
  --some-keyword: italic;
  --some-size: 1.25em;
  --some-complex-value: 1px 1px 2px whitesmoke, 0 0 1em slategray, 0 0 0.2em slategray;
  color: var(--some-color);
  font-size: var(--some-size);
  font-style: var(--some-keyword);
  text-shadow: var(--some-complex-value);
}
```


#### Explanation


- The variables are defined globally within the `:root` CSS pseudo-class which matches the root element of a tree representing the document. Variables can also be scoped to a selector if defined within the block.
- Declare a variable with `--variable-name:`.
- Reuse variables throughout the document using the `var(--variable-name)` function.


#### Browser support

96.5%

- https://caniuse.com/#feat=css-variables

<br>[⬆ Back to top](#contents)

---

##  Visual


### Border with top triangle

Creates a text container with a triangle at the top.

#### HTML

```html
<div class="container">
  Border with top triangle
</div>
```

```css
.container {
  position: relative;
  background: #ffffff;
  padding: 15px;
  border: 1px solid #dddddd;
  margin-top: 20px;
}

.container:before, .container:after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 19px;
  border: 11px solid transparent;
  border-bottom-color: #dddddd;
}

.container:after {
  left: 20px;
  border: 10px solid transparent;
  border-bottom-color: #ffffff;
}
```


#### Explanation


- Use the `:before` and `:after` pseudo-elements to create two triangles. 
- The color of the `:before` triangle should be the same as the container's border color. 
- The color of the `:after` triangle should be the same as the container background color.
- The border width of the `:before` triangle should be `1px` wider than the `:after` triangle, in order to act as the border.
- The `:after` triangle should be `1px` to the right of the `:before` triangle to allow for its left border to be shown.


#### Browser support

100.0%

<br>[⬆ Back to top](#contents)

### Circle

Creates a circle shape with pure CSS.

```html
<div class="circle"></div>
```

```css
.circle {
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  background: #333;
}
```


#### Explanation


- `border-radius: 50%` curves the borders of an element to create a circle.
- Since a circle has the same radius at any given point, the `width` and `height` must be the same. Differing values will create an ellipse.


#### Browser support

100.0%

- https://caniuse.com/#feat=border-radius

<br>[⬆ Back to top](#contents)

### Counter

Counters are, in essence, variables maintained by CSS whose values may be incremented by CSS rules to track how many times they're used.

```html
<ul>
  <li>List item</li>
  <li>List item</li>
  <li>
    List item
    <ul>
      <li>List item</li>
      <li>List item</li>
      <li>List item</li>
    </ul>
  </li>
</ul>
```

```css
ul {
  counter-reset: counter;
}

li::before {
  counter-increment: counter;
  content: counters(counter, '.') ' ';
}
```


#### Explanation


- You can create a ordered list using any type of HTML.

1. `counter-reset` Initializes a counter, the value is the name of the counter. By default, the counter starts at 0. This property can also be used to change its value to any specific number.
2. `counter-increment` Used in element that will be countable. Once `counter-reset` initialized, a counter's value can be increased or decreased.
3. `counter(name, style)` Displays the value of a section counter. Generally used in a `content` property. This function can receive two parameters, the first as the name of the counter and the second one can be `decimal` or `upper-roman` (`decimal` by default).
4. `counters(counter, string, style)` Displays the value of a section counter. Generally used in a `content` property. This function can receive three parameters, the first as the name of the counter, the second one you can include a string which comes after the counter and the third one can be `decimal` or `upper-roman` (`decimal` by default).
5. A CSS counter can be especially useful for making outlined lists, because a new instance of the counter is automatically created in child elements. Using the `counters()` function, separating text can be inserted between different levels of nested counters.


#### Browser support

100.0%

- https://caniuse.com/#feat=css-counters

<br>[⬆ Back to top](#contents)

### Custom scrollbar

Customizes the scrollbar style for the document and elements with scrollable overflow, on WebKit platforms.

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


#### Explanation


1. `::-webkit-scrollbar` targets the whole scrollbar element.
2. `::-webkit-scrollbar-track` targets only the scrollbar track.
3. `::-webkit-scrollbar-thumb` targets the scrollbar thumb.

There are many other pseudo-elements that you can use to style scrollbars. For more info, visit the [WebKit Blog](https://webkit.org/blog/363/styling-scrollbars/).


#### Browser support

97.7%

<span class="snippet__support-note">⚠️ Scrollbar styling doesn't appear to be on any standards track.</span>

- https://caniuse.com/#feat=css-scrollbar

<br>[⬆ Back to top](#contents)

### Custom text selection

Changes the styling of text selection.

```html
<p class="custom-text-selection">Select some of this text.</p>
```

```css
::selection {
  background: aquamarine;
  color: black;
}
.custom-text-selection::selection {
  background: deeppink;
  color: white;
}
```


#### Explanation


- `::selection` defines a pseudo selector on an element to style text within it when selected. Note that if you don't combine any other selector your style will be applied at document root level, to any selectable element.


#### Browser support

90.1%

<span class="snippet__support-note">⚠️ Requires prefixes for full support and is not actually
in any specification.</span>

- https://caniuse.com/#feat=css-selection

<br>[⬆ Back to top](#contents)

### Drop cap

Makes the first letter in the first paragraph bigger than the rest of the text - often used to signify the beginning of a new section.

```html
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam commodo ligula quis tincidunt cursus. Integer consectetur tempor ex eget hendrerit. Cras facilisis sodales odio nec maximus. Pellentesque lacinia convallis libero, rhoncus tincidunt ante dictum at. Nullam facilisis lectus tellus, sit amet congue erat sodales commodo.</p>
<p>Donec magna erat, imperdiet non odio sed, sodales tempus magna. Integer vitae orci lectus. Nullam consectetur orci at pellentesque efficitur.</p>
```

```css
p:first-child::first-letter {
  color: #5f79ff;
  float: left;
  margin: 0 8px 0 4px;
  font-size: 3rem;
  font-weight: bold;
  line-height: 1;
}
```


#### Explanation


- Use the `::first-letter` pseudo-element to style the first element of the paragraph, use the `:first-child` selector to select only the first paragraph.


#### Browser support

100.0%

- https://caniuse.com/#feat=first-letter

<br>[⬆ Back to top](#contents)

### Dynamic shadow

Creates a shadow similar to `box-shadow` but based on the colors of the element itself.

```html
<div class="dynamic-shadow"></div>
```

```css
.dynamic-shadow {
  position: relative;
  width: 10rem;
  height: 10rem;
  background: linear-gradient(75deg, #6d78ff, #00ffb8);
  z-index: 1;
}
.dynamic-shadow::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background: inherit;
  top: 0.5rem;
  filter: blur(0.4rem);
  opacity: 0.7;
  z-index: -1;
}
```


#### Explanation


1. `position: relative` on the element establishes a Cartesian positioning context for psuedo-elements.
2. `z-index: 1` establishes a new stacking context.
3. `::after` defines a pseudo-element.
4. `position: absolute` takes the pseudo element out of the flow of the document and positions it in relation to the parent.
5. `width: 100%` and `height: 100%` sizes the pseudo-element to fill its parent's dimensions, making it equal in size.
6. `background: inherit` causes the pseudo-element to inherit the linear gradient specified on the element.
7. `top: 0.5rem` offsets the pseudo-element down slightly from its parent.
8. `filter: blur(0.4rem)` will blur the pseudo-element to create the appearance of a shadow underneath.
9. `opacity: 0.7` makes the pseudo-element partially transparent.
10. `z-index: -1` positions the pseudo-element behind the parent but in front of the background.


#### Browser support

98.5%

<span class="snippet__support-note">⚠️ Requires prefixes for full support.</span>

- https://caniuse.com/#feat=css-filters

<br>[⬆ Back to top](#contents)

### Etched text

Creates an effect where text appears to be "etched" or engraved into the background.

```html
<p class="etched-text">I appear etched into the background.</p>
```

```css
.etched-text {
  text-shadow: 0 2px white;
  font-size: 1.5rem;
  font-weight: bold;
  color: #b8bec5;
}
```


#### Explanation


- `text-shadow: 0 2px white` creates a white shadow offset `0px` horizontally and `2px` vertically from the origin position.
- The background must be darker than the shadow for the effect to work.
- The text color should be slightly faded to make it look like it's engraved/carved out of the background.


#### Browser support

100.0%

- https://caniuse.com/#feat=css-textshadow

<br>[⬆ Back to top](#contents)

### Focus Within

Changes the appearance of a form if any of its children are focused.

```html
<div class="focus-within">
  <form>
    <label for="given_name">Given Name:</label> <input id="given_name" type="text" /> <br />
    <label for="family_name">Family Name:</label> <input id="family_name" type="text" />
  </form>
</div>
```

```css
form {
  border: 3px solid #2d98da;
  color: #000000;
  padding: 4px;
}

form:focus-within {
  background: #f7b731;
  color: #000000;
}
```


#### Explanation


- The psuedo class `:focus-within` applies styles to a parent element if any child element gets focused. For example, an `input` element inside a `form` element.


#### Browser support

85.4%

<span class="snippet__support-note">⚠️ Not supported in IE11 or the current version of Edge.</span>

<!-- Whenever possible, link a `caniuse` feature which allows the browser support percentage to be displayed.
If no link is provided, it defaults to 99+%. -->

- https://caniuse.com/#feat=css-focus-within

<br>[⬆ Back to top](#contents)

### Fullscreen

The :fullscreen CSS pseudo-class represents an element that's displayed when the browser is in fullscreen mode.

```html
<div class="container">
  <p><em>Click the button below to enter the element into fullscreen mode. </em></p>
  <div class="element" id="element"><p>I change color in fullscreen mode!</p></div>
  <br />
  <button onclick="var el = document.getElementById('element'); el.requestFullscreen();">
    Go Full Screen!
  </button>
</div>
```

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
  box-sizing: border-box;
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


#### Explanation


1. `fullscreen` CSS pseudo-class selector is used to select and style an element that is being displayed in fullscreen mode.


#### Browser support

99.1%

- https://developer.mozilla.org/en-US/docs/Web/CSS/:fullscreen
- https://caniuse.com/#feat=fullscreen

<br>[⬆ Back to top](#contents)

### Gradient text

Gives text a gradient color.

```html
<p class="gradient-text">Gradient text</p>
```

```css
.gradient-text {
  background: -webkit-linear-gradient(pink, red);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}
```


#### Explanation


1. `background: -webkit-linear-gradient(...)` gives the text element a gradient background.
2. `webkit-text-fill-color: transparent` fills the text with a transparent color.
3. `webkit-background-clip: text` clips the background with the text, filling the text with the gradient background as the color.


#### Browser support

98.7%

<span class="snippet__support-note">⚠️ Uses non-standard properties.</span>

- https://caniuse.com/#feat=text-stroke

<br>[⬆ Back to top](#contents)

### Hairline border

Gives an element a border equal to 1 native device pixel in width, which can look
very sharp and crisp.

```html
<div class="hairline-border">text</div>
```

```css
.hairline-border {
  box-shadow: 0 0 0 1px;
}

@media (min-resolution: 2dppx) {
  .hairline-border {
    box-shadow: 0 0 0 0.5px;
  }
}

@media (min-resolution: 3dppx) {
  .hairline-border {
    box-shadow: 0 0 0 0.33333333px;
  }
}

@media (min-resolution: 4dppx) {
  .hairline-border {
    box-shadow: 0 0 0 0.25px;
  }
}
```


#### Explanation


1. `box-shadow`, when only using spread, adds a pseudo-border which can use subpixels\*.
2. Use `@media (min-resolution: ...)` to check the device pixel ratio (`1dppx` equals 96 DPI), setting the spread of the `box-shadow` equal to `1 / dppx`.


#### Browser support

100.0%

<span class="snippet__support-note">⚠️ Needs alternate syntax and JavaScript user agent checking for full support.</span>

- https://caniuse.com/#feat=css-boxshadow
- https://caniuse.com/#feat=css-media-resolution

<hr>

\*Chrome does not support subpixel values on `border`. Safari does not support subpixel values on `box-shadow`. Firefox supports subpixel values on both.

<br>[⬆ Back to top](#contents)

### Mouse cursor gradient tracking

A hover effect where the gradient follows the mouse cursor.

<small class="snippet__credit">**Credit:** [Tobias Reich](https://codepen.io/electerious/pen/MQrRxX)</small>

```html
<button class="mouse-cursor-gradient-tracking"><span>Hover me</span></button>
```

```css
.mouse-cursor-gradient-tracking {
  position: relative;
  background: #7983ff;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border: none;
  color: white;
  cursor: pointer;
  outline: none;
  overflow: hidden;
}

.mouse-cursor-gradient-tracking span {
  position: relative;
}

.mouse-cursor-gradient-tracking::before {
  --size: 0;
  content: '';
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--size);
  height: var(--size);
  background: radial-gradient(circle closest-side, pink, transparent);
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease;
}

.mouse-cursor-gradient-tracking:hover::before {
  --size: 200px;
}
```

```js
var btn = document.querySelector('.mouse-cursor-gradient-tracking')
btn.onmousemove = function(e) {
  var rect = e.target.getBoundingClientRect()
  var x = e.clientX - rect.left
  var y = e.clientY - rect.top
  btn.style.setProperty('--x', x + 'px')
  btn.style.setProperty('--y', y + 'px')
}
```


#### Explanation


1. `--x` and `--y` are used to track the position of the mouse on the button.
2. `--size` is used to keep modify of the gradient's dimensions.
3. `background: radial-gradient(circle closest-side, pink, transparent);` creates the gradient at the correct postion.


#### Browser support

96.5%

<span class="snippet__support-note">⚠️ Requires JavaScript.</span>

- https://caniuse.com/#feat=css-variables

<br>[⬆ Back to top](#contents)

### Navigation list item hover and focus effect

Fancy hover and focus effect at navigation items using transform CSS property.

```html
<nav>
  <ul>
    <li><a href="#/">Home</a></li>
    <li><a href="#/">About</a></li>
    <li><a href="#/">Contact</a></li>
  </ul>
</nav>
```

```css
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

nav li {
  float: left;
}

nav li a {
  position: relative;
  display: block;
  color: #222;
  text-align: center;
  padding: 8px 12px;
  text-decoration: none;
}

li a::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  background-color: #f6c126;
  z-index: -1;
  transform: scale(0);
  transition: transform 0.5s ease-in-out;
}

li a:hover::before, li a:focus::before {
  transform: scale(1);
}
```


#### Explanation


- Use the `::before` pseudo-element at the list item anchor to create a hover effect, hide it using `transform: scale(0)`.
- Use the `:hover` and `:focus` pseudo-selectors to transition to `transform: scale(1)` and show the pseudo-element with its colored background.
- Prevent the pseudo-element from covering the anchor element by using `z-index: -1`.


#### Browser support

100.0%

- https://caniuse.com/#feat=transforms2d
- https://caniuse.com/#feat=css-transitions

<br>[⬆ Back to top](#contents)

### :not selector

The `:not` pseudo selector is useful for styling a group of elements, while leaving the last (or specified) element unstyled.

```html
<ul class="css-not-selector-shortcut">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
</ul>
```

```css
.css-not-selector-shortcut {
  display: flex;
}

ul {
  padding-left: 0;
}

li {
  list-style-type: none;
  margin: 0;
  padding: 0 0.75rem;
}

li:not(:last-child) {
  border-right: 2px solid #d2d5e4;
}
```


#### Explanation


- `li:not(:last-child)` specifies that the styles should apply to all `li` elements except the `:last-child`.


#### Browser support

100.0%

- https://caniuse.com/#feat=css-sel3

<br>[⬆ Back to top](#contents)

### Overflow scroll gradient

Adds a fading gradient to an overflowing element to better indicate there is more content to be scrolled.

```html
<div class="overflow-scroll-gradient">
  <div class="overflow-scroll-gradient__scroller">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
    Iure id exercitationem nulla qui repellat laborum vitae, <br />
    molestias tempora velit natus. Quas, assumenda nisi. <br />
    Quisquam enim qui iure, consequatur velit sit? <br />
    Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />
    Iure id exercitationem nulla qui repellat laborum vitae, <br />
    molestias tempora velit natus. Quas, assumenda nisi. <br />
    Quisquam enim qui iure, consequatur velit sit?
  </div>
</div>
```

```css
.overflow-scroll-gradient {
  position: relative;
}
.overflow-scroll-gradient::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 250px;
  height: 25px;
  background: linear-gradient(
    rgba(255, 255, 255, 0.001),
    white
  ); /* transparent keyword is broken in Safari */
  pointer-events: none;
}
.overflow-scroll-gradient__scroller {
  overflow-y: scroll;
  background: white;
  width: 240px;
  height: 200px;
  padding: 15px;
  line-height: 1.2;
}
```


#### Explanation


1. `position: relative` on the parent establishes a Cartesian positioning context for pseudo-elements.
2. `::after` defines a pseudo element.
3. `background-image: linear-gradient(...)` adds a linear gradient that fades from transparent to white (top to bottom).
4. `position: absolute` takes the pseudo element out of the flow of the document and positions it in relation to the parent.
5. `width: 240px` matches the size of the scrolling element (which is a child of the parent that has the pseudo element).
6. `height: 25px` is the height of the fading gradient pseudo-element, which should be kept relatively small.
7. `bottom: 0` positions the pseudo-element at the bottom of the parent.
8. `pointer-events: none` specifies that the pseudo-element cannot be a target of mouse events, allowing text behind it to still be selectable/interactive.


#### Browser support

100.0%

- https://caniuse.com/#feat=css-gradients

<br>[⬆ Back to top](#contents)

### Pretty text underline

A nicer alternative to `text-decoration: underline` or `<u></u>` where descenders do not clip the underline.
Natively implemented as `text-decoration-skip-ink: auto` but it has less control over the underline.

```html
<p class="pretty-text-underline">Pretty text underline without clipping descending letters.</p>
```

```css
.pretty-text-underline {
  display: inline;
  text-shadow: 1px 1px #f5f6f9, -1px 1px #f5f6f9, -1px -1px #f5f6f9, 1px -1px #f5f6f9;
  background-image: linear-gradient(90deg, currentColor 100%, transparent 100%);
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 100% 1px;
}
.pretty-text-underline::-moz-selection {
  background-color: rgba(0, 150, 255, 0.3);
  text-shadow: none;
}
.pretty-text-underline::selection {
  background-color: rgba(0, 150, 255, 0.3);
  text-shadow: none;
}
```


#### Explanation


1. `text-shadow` uses 4 values with offsets that cover a 4x4 px area to ensure the underline has a "thick" shadow that covers the line where descenders clip it. Use a color that matches the background. For a larger font, use a larger `px` size. Additional values can create an even thicker shadow, and subpixel values can also be used.
2. `background-image: linear-gradient(...)` creates a 90deg gradient using the text color (`currentColor`).
3. The `background-*` properties size the gradient as 100% of the width of the block and 1px in height at the bottom and disables repetition, which creates a 1px underline beneath the text.
4. The `::selection` pseudo selector rule ensures the text shadow does not interfere with text selection.


#### Browser support

100.0%

- https://caniuse.com/#feat=css-textshadow
- https://caniuse.com/#feat=css-gradients

<br>[⬆ Back to top](#contents)

### Reset all styles

Resets all styles to default values with one property. This will not affect `direction` and `unicode-bidi` properties.

```html
<div class="reset-all-styles">
  <h5>Title</h5>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure id exercitationem nulla qui
    repellat laborum vitae, molestias tempora velit natus. Quas, assumenda nisi. Quisquam enim qui
    iure, consequatur velit sit?
  </p>
</div>
```

```css
.reset-all-styles {
  all: initial;
}
```


#### Explanation


- The `all` property allows you to reset all styles (inherited or not) to default values.


#### Browser support

95.8%

<span class="snippet__support-note">⚠️ MS Edge status is under consideration.</span>

- https://caniuse.com/#feat=css-all

<br>[⬆ Back to top](#contents)

### Shape separator

Uses an SVG shape to separate two different blocks to create more a interesting visual appearance compared to standard horizontal separation.

```html
<div class="shape-separator"></div>
```

```css
.shape-separator {
  position: relative;
  height: 48px;
  background: #333;
}
.shape-separator::after {
  content: '';
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 12'%3E%3Cpath d='m12 0l12 12h-24z' fill='%23fff'/%3E%3C/svg%3E");
  position: absolute;
  width: 100%;
  height: 12px;
  bottom: 0;
}
```


#### Explanation


1. `position: relative` on the element establishes a Cartesian positioning context for pseudo elements.
2. `::after` defines a pseudo element.
3. `background-image: url(...)` adds the SVG shape (a 24x12 triangle) as the background image of the pseudo element, which repeats by default. It must be the same color as the block that is being separated. For other shapes, we can use [the URL-encoder for SVG](http://yoksel.github.io/url-encoder/).
4. `position: absolute` takes the pseudo element out of the flow of the document and positions it in relation to the parent.
5. `width: 100%` ensures the element stretches the entire width of its parent.
6. `height: 12px` is the same height as the shape.
7. `bottom: 0` positions the pseudo element at the bottom of the parent.


#### Browser support

100.0%

- https://caniuse.com/#feat=svg

<br>[⬆ Back to top](#contents)

### System font stack

Uses the native font of the operating system to get close to a native app feel.

```html
<p class="system-font-stack">This text uses the system font.</p>
```

```css
.system-font-stack {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu,
    Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
```


#### Explanation


- The browser looks for each successive font, preferring the first one if possible, and falls back to the next if it cannot find the font (on the system or defined in CSS).

1. `-apple-system` is San Francisco, used on iOS and macOS (not Chrome however)
2. `BlinkMacSystemFont` is San Francisco, used on macOS Chrome
3. `Segoe UI` is used on Windows 10
4. `Roboto` is used on Android
5. `Oxygen-Sans` is used on Linux with KDE
6. `Ubuntu` is used on Ubuntu (all variants)
7. `Cantarell` is used on Linux with GNOME Shell
8. `"Helvetica Neue"` and `Helvetica` is used on macOS 10.10 and below (wrapped in quotes because it has a space)
9. `Arial` is a font widely supported by all operating systems
10. `sans-serif` is the fallback sans-serif font if none of the other fonts are supported


#### Browser support

100.0%

<br>[⬆ Back to top](#contents)

### Toggle switch

Creates a toggle switch with CSS only.

```html
<input type="checkbox" id="toggle" class="offscreen" /> <label for="toggle" class="switch"></label>
```

```css
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  transition: all 0.3s;
}

.switch::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background-color: white;
  top: 1px;
  left: 1px;
  transition: all 0.3s;
}

input[type='checkbox']:checked + .switch::after {
  transform: translateX(20px);
}

input[type='checkbox']:checked + .switch {
  background-color: #7983ff;
}

.offscreen {
  position: absolute;
  left: -9999px;
}
```


#### Explanation


- This effect is styling only the `<label>` element to look like a toggle switch, and hiding the actual `<input>` checkbox by positioning it offscreen. When clicking the label associated with the `<input>` element, it sets the `<input>` checkbox into the `:checked` state.

1. The `for` attribute associates the `<label>` with the appropriate `<input>` checkbox element by its `id`.
2. `.switch::after` defines a pseudo-element for the `<label>` to create the circular knob.
3. `input[type='checkbox']:checked + .switch::after` targets the `<label>`'s pseudo-element's style when the checkbox is `checked`.
4. `transform: translateX(20px)` moves the pseudo-element (knob) 20px to the right when the checkbox is `checked`.
5. `background-color: #7983ff;` sets the background-color of the switch to a different color when the checkbox is `checked`.
6. `.offscreen` moves the `<input>` checkbox element, which does not comprise any part of the actual toggle switch, out of the flow of document and positions it far away from the view, but does not hide it so it is accessible via keyboard and screen readers.
7. `transition: all 0.3s` specifies all property changes will be transitioned over 0.3 seconds, therefore transitioning the `<label>`'s `background-color` and the pseudo-element's `transform` property when the checkbox is checked.


#### Browser support

100.0%

<span class="snippet__support-note">⚠️ Requires prefixes for full support.</span>

- https://caniuse.com/#feat=transforms2d

<br>[⬆ Back to top](#contents)

### Triangle

Creates a triangle shape with pure CSS.

```html
<div class="triangle"></div>
```

```css
.triangle {
  width: 0;
  height: 0;
  border-top: 20px solid #333;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```


#### Explanation


- [View this link for a detailed explanation.](https://stackoverflow.com/q/7073484)
- The color of the border is the color of the triangle. The side the triangle tip points corresponds to the opposite `border-*` property. For example, a color on `border-top` means the arrow points downward.
- Experiment with the `px` values to change the proportion of the triangle.


#### Browser support

100.0%

<br>[⬆ Back to top](#contents)

### Zebra striped list

Creates a striped list with alternating background colors, which is useful for differentiating siblings that have content spread across a wide row.

```html
<ul>
  <li>Item 01</li>
  <li>Item 02</li>
  <li>Item 03</li>
  <li>Item 04</li>
  <li>Item 05</li>
</ul>
```

```css
li:nth-child(odd) {
  background-color: #ddd;
}
```


#### Explanation


- Use the `:nth-child(odd)` or `:nth-child(even)` pseudo-class to apply a different background color to elements that match based on their position in a group of siblings.
- Note that you can use it to apply different styles to other HTML elements like div, tr, p, ol, etc.


#### Browser support

100.0%

https://caniuse.com/#feat=css-sel3

<br>[⬆ Back to top](#contents)

---

_This README is built using [markdown-builder](https://github.com/30-seconds/markdown-builder)._

