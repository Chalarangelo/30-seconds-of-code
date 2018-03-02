### Bouncy Animated loading animation

Clean & simple animated loading animation with CSS3. If you are worried about super deep browser support, use a GIF.

#### HTML

```html
<div class="loader">
    <span></span>
    <span></span>
    <span></span>
</div>
```

#### CSS

```css
.snippet-demo__Animated-loading-animation {
    text-align: center;    
}
.snippet-demo__Animated-loading-animation span {
    display: inline-block;
    vertical-align: middle;
    width: 24px;
    height: 24px;
    margin: 50px auto;
    background: black;
    border-radius: 50px;
    animation: loader 0.9s infinite alternate;
}
.snippet-demo__Animated-loading-animation span:nth-of-type(2) {
    animation-delay: 0.3s;
}
.snippet-demo__Animated-loading-animation span:nth-of-type(3) {
    animation-delay: 0.6s;
}
@keyframes loader {
  0% {
    opacity: 0.9;
    transform: translateY(0);
  }
  100% {
    opacity: 0.1;
    transform: translateY(-21px);
  }
}
```

#### Demo

<!-- You must create a `snippet-demo` parent block and use it as a namespace with BEM syntax. -->

<div class="snippet-demo">
  <div class="snippet-demo__Animated-loading-animation">
  	<span></span>
    <span></span>
    <span></span>
  </div>
</div>

<!-- Add your style rules here. -->

<style>
.snippet-demo__Animated-loading-animation {
    text-align: center;    
}
.snippet-demo__Animated-loading-animation span {
    display: inline-block;
    vertical-align: middle;
    width: 24px;
    height: 24px;
    margin: 50px auto;
    background: black;
    border-radius: 50px;
    animation: loader 0.9s infinite alternate;
}
.snippet-demo__Animated-loading-animation span:nth-of-type(2) {
    animation-delay: 0.3s;
}
.snippet-demo__Animated-loading-animation span:nth-of-type(3) {
    animation-delay: 0.6s;
}
@keyframes loader {
  0% {
    opacity: 0.9;
    transform: translateY(0);
  }
  100% {
    opacity: 0.1;
    transform: translateY(-21px);
  }
}
</style>

#### Explanation

<!-- Use a step-by-step (ordered) list if possible. Keep it concise. -->
+1. `translateY` The translateY() CSS function repositions an element vertically on the 2D plane.
+2. `animation` The animation CSS property is a shorthand property for the various animation properties: animation-name, animation-duration, animation-timing-function, animation-delay, animation-iteration-count, animation-direction, animation-fill-mode, and animation-play-state.

#### Browser support

<!-- Use the checkmark or the warning emoji, see the existing snippets. -->

<span class="snippet__support-note">94.7%</span>

<!-- Whenever possible, link a `caniuse` feature which allows the browser support percentage to be displayed.
If no link is provided, it defaults to 99+%. -->

* https://caniuse.com/#feat=css-animation