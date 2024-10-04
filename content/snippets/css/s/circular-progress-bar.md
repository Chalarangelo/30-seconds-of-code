---
title: How can I create a circular progress bar using only CSS?
shortTitle: Circular progress bar
language: css
tags: [visual,animation]
cover: clouds-over-mountains
excerpt: Circular progress bars are fairly common in the web. Luckily, some new CSS features make it easier than ever to create them.
listed: true
dateModified: 2023-12-23
---

Circular progress bars are a fairly common element in today's websites. Yet, to many developers, they seem like quite the intimidating challenge. The truth of the matter is that getting the basics right is not that hard. In fact, with the help of some new CSS features, it's easier than ever.

## Anatomy of a circular progress bar

A circular progress bar is, at the simplest, **two circles stacked on top of each other**. The bottom circle is the **background**, and the top circle is the **progress indicator**. We'll get to how we fill the progress indicator in a bit, but the basic structure can be easily built using an `<svg>` element and a little bit of CSS.

```html
<svg width="250" height="250" viewBox="0 0 250 250">
  <circle class="bg"
    cx="125" cy="125" r="115" fill="none" stroke="#ddd" stroke-width="20"
  ></circle>
  <circle class="fg"
    cx="125" cy="125" r="115" fill="none" stroke="#5394fd" stroke-width="20"
  ></circle>
</svg>
```

```css
circle.fg {
  transform: rotate(-90deg);
  transform-origin: 125px 125px;
}
```

As you can see, the only piece of CSS we need to get the basic structure right is a `transform` property. We **rotate the foreground circle by 90 degrees**, and we set the `transform-origin` to the **center of the circle**. This way, the circle is rotated around its center, and the progress indicator starts at the top.

### Doing the math

Before we move forward, we might as well take a moment to understand the math behind the code.

The two values we need to decide are the **size** of the progress bar and the **width of the stroke**. For this example, we settled on a size of `250px` and a stroke width of `20px`. We'll use these values to calculate the rest of the values we need.

The size is use to set the `width` and `height` attributes of the SVG element, as well as the `viewBox` attribute. Dividing it by two, we get `125px`, which corresponds to the coordinates of the **center of the image**. This value is used to set the `cx` and `cy` attributes of the circles.

Taking into account the stroke width, we can calculate the **radius of the circle**. The radius is the distance from the center of the circle to the edge. In this case, the radius is `115px`, which is the size of the image, minus the stroke width, divided by two.

Finally, we can calculate the **circumference of the circle**. The circumference is the length of the edge of the circle. In this case, the circumference is `722.5px`, which is `2 * π * 115px`.

| Variable | Value | Formula |
| -------- | ----- | ------- |
| **size** | `250px` | N/A (user defined) |
| **stroke** | `20px` | N/A (user defined) |
| **center** | `125px` | `size / 2` |
| **radius** | `115px` | `(size - stroke) / 2` |
| **circumference** | `722.5px` | `2 * π * radius` |

These numbers will start coming in handy as we move forward, but I promise this is almost all the math we'll need to do.

## Filling the progress indicator

Now that we have the basic structure in place, we need to **fill the progress indicator**. To do this, we'll use the `stroke-dasharray` property, which takes alternating values for lengths and dashes.

To create a progress bar, we want to pass two values: the length of the filled part, and the length of the empty part. To get the **filled part** we multiply the progress percentage by the circumference of the circle. To get the **empty part**, we subtract the filled part from the circumference.

Supposing we want to fill 50% of the circle, the SVG code would look like this:

```html
<svg width="250" height="250" viewBox="0 0 250 250">
  <circle class="bg"
    cx="125" cy="125" r="115" fill="none" stroke="#ddd" stroke-width="20"
  ></circle>
  <circle class="fg"
    cx="125" cy="125" r="115" fill="none" stroke="#5394fd" stroke-width="20"
    stroke-dasharray="361.25 361.25"
  ></circle>
```

## Making the progress bar dynamic

Hardcoding the `stroke-dasharray` value is not very useful. We want to be able to **set the progress percentage dynamically**. This is where [CSS variables](/css/s/variables) and the math from before come into play.

Given a `--progress` variable, we can calculate the `stroke-dasharray` relatively easily. Knowing we will need most of the values from before, we can set them as CSS variables, too. Even better, most of the SVG attributes we want to set can be manipulated using CSS.

Here's what the restructured code looks like:

```html
<svg
  width="250" height="250" viewBox="0 0 250 250"
  class="circular-progress" style="--progress: 50"
>
  <circle class="bg"></circle>
  <circle class="fg"></circle>
</svg>
```

```css
.circular-progress {
  --size: 250px;
  --half-size: calc(var(--size) / 2);
  --stroke-width: 20px;
  --radius: calc((var(--size) - var(--stroke-width)) / 2);
  --circumference: calc(var(--radius) * pi * 2);
  --dash: calc((var(--progress) * var(--circumference)) / 100);
}

.circular-progress circle {
  cx: var(--half-size);
  cy: var(--half-size);
  r: var(--radius);
  stroke-width: var(--stroke-width);
  fill: none;
  stroke-linecap: round;
}

.circular-progress circle.bg {
  stroke: #ddd;
}

.circular-progress circle.fg {
  transform: rotate(-90deg);
  transform-origin: var(--half-size) var(--half-size);
  stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
  transition: stroke-dasharray 0.3s linear 0s;
  stroke: #5394fd;
}
```

This may look like a lot, but it's mostly just setting CSS variables and using them to calculate the values we need. One cool thing I want to point out is that the `pi` constant is available as part of the `calc()` function! I didn't know this until I started writing this article, and I'm very excited about it.

At this point, if you use some JavaScript to manipulate the value of the `--progress` variable, you'll see the progress bar fill up. The added `transition` property will make the progress bar animate smoothly.

## Timed progress bar

Have you ever watched an ad inside a mobile game? You know, the ones that give you a reward if you watch the whole thing? They usually have a progress bar that fills up as the ad plays. Or it empties as you watch, much like a countdown timer. Whatever flavor you might have seen, they are variations of the same concept.

_How can we create a progress bar that fills up over a predetermined amount of time?_ We could go about it using JavaScript and `Window.requestAnimationFrame()`, but that wouldn't be very cool. Instead, we can use the `animation` property to animate the `--progress` variable from `0` to `100` over a set amount of time.

```css
@keyframes progress-animation {
  from {
    --progress: 0;
  }
  to {
    --progress: 100;
  }
}
```

If you try hooking this up to our SVG, you'll notice it doesn't work exactly like you'd think. This is due to the fact that the browser doesn't really know what to do with the `--progress` variable. It doesn't know it's a number, so it doesn't know how to animate it.

Luckily, CSS has come up with a solution for this. The `@property` rule allows us to define custom properties and tell the browser what type they are. In this case, we want to tell the browser that `--progress` is a number.

```css
@property --progress {
  syntax: "<number>";
  inherits: false;
  initial-value: 0;
}
```

> [!WARNING]
>
> At the time of writing (December, 2023), the `@property` rule has [limited browser support](https://developer.mozilla.org/en-US/docs/Web/CSS/@property#browser_compatibility). Please check before using it in production.

Now that the browser knows what to do with the `--progress` variable, we can hook it up to the animation.

```css
.circular-progress {
  animation: progress-animation 5s linear 0s 1 forwards;
}
```

This will animate the `--progress` variable from `0` to `100` over 5 seconds. The `forwards` keyword tells the browser to keep the final value of the animation. Without it, the progress bar would reset to `0` after the animation is done. You can create the opposite effect by setting the `animation-direction` property to `reverse` and using `backwards` instead of `forwards`.

## Putting it all together

We've covered a lot of ground in this article. We've gone from a simple SVG element to a fully functional progress bar. We've used CSS variables, math functions, and even a new CSS feature. Let's take a look at the final code.

```html
<svg width="250" height="250" viewBox="0 0 250 250" class="circular-progress">
  <circle class="bg"></circle>
  <circle class="fg"></circle>
</svg>
```

```css
.circular-progress {
  --size: 250px;
  --half-size: calc(var(--size) / 2);
  --stroke-width: 20px;
  --radius: calc((var(--size) - var(--stroke-width)) / 2);
  --circumference: calc(var(--radius) * pi * 2);
  --dash: calc((var(--progress) * var(--circumference)) / 100);
  animation: progress-animation 5s linear 0s 1 forwards;
}

.circular-progress circle {
  cx: var(--half-size);
  cy: var(--half-size);
  r: var(--radius);
  stroke-width: var(--stroke-width);
  fill: none;
  stroke-linecap: round;
}

.circular-progress circle.bg {
  stroke: #ddd;
}

.circular-progress circle.fg {
  transform: rotate(-90deg);
  transform-origin: var(--half-size) var(--half-size);
  stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
  transition: stroke-dasharray 0.3s linear 0s;
  stroke: #5394fd;
}

@property --progress {
  syntax: "<number>";
  inherits: false;
  initial-value: 0;
}

@keyframes progress-animation {
  from {
    --progress: 0;
  }
  to {
    --progress: 100;
  }
}
```

And here's a CodePen of the code in action:

https://codepen.io/chalarangelo/pen/mdodgeL

## Conclusion

Using modern HTML and CSS, we created a circular progress bar. This setup serves as a good starting point for you to experiment with. You can use it as is, or you can extend it to suit your needs, sprinkling in a little bit of JavaScript if you need to. You can even convert it into a Web Component or a React component for your projects.
