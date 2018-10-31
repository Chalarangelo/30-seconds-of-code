### Bouncing loader

Creates a bouncing loader animation.

#### HTML

```html
<div class="bouncing-loader">
  <div></div>
  <div></div>
  <div></div>
</div>
```

#### CSS

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

#### Demo

#### Explanation

Note: `1rem` is usually `16px`.

1. `@keyframes` defines an animation that has two states, where the element changes `opacity` and is translated up on the 2D plane using `transform: translate3d()`. Using a single axis translation on `transform: translate3d()` improves the performance of the animation.

2. `.bouncing-loader` is the parent container of the bouncing circles and uses `display: flex`
   and `justify-content: center` to position them in the center.

3. `.bouncing-loader > div`, targets the three child `div`s of the parent to be styled. The `div`s are given a width and height of `1rem`, using `border-radius: 50%` to turn them from squares to circles.

4. `margin: 3rem 0.2rem` specifies that each circle has a top/bottom margin of `3rem` and left/right margin
   of `0.2rem` so that they do not directly touch each other, giving them some breathing room.

5. `animation` is a shorthand property for the various animation properties: `animation-name`, `animation-duration`, `animation-iteration-count`, `animation-direction` are used.

6. `nth-child(n)` targets the element which is the nth child of its parent.

7. `animation-delay` is used on the second and third `div` respectively, so that each element does not start the animation at the same time.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

- https://caniuse.com/#feat=css-animation

<!-- tags: animation -->
