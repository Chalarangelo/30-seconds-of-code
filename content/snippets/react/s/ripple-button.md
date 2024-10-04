---
title: Button with ripple effect
language: react
tags: [components,state,effect]
cover: mountain-lake-cottage
excerpt: Learn how to create an animated button with a ripple effect when clicked.
listed: true
dateModified: 2024-06-20
---

Ripple effects on click were popularized by the **Material Design** guidelines. They provide visual feedback to the user when interacting with a button. While seemingly simple, they're a little tricky to implement overall.

## Anatomy of the button

The button consists of **two main parts**: the ripple circle and the button content. In this implementation, the ripple circle is a `span` element with the `ripple` class. The button content is a `span` element with the `content` class. The ripple circle is **positioned absolutely** inside the button and is animated when the button is clicked.

```html
<button class="ripple-button">
  <span class="ripple"></span>
  <span class="content">Click me</span>
</button>
```

## The ripple animation

For the ripple effect animation, we'll use the `transform` property to **scale** the ripple circle and the `opacity` property to **fade** it out. The `animation` property is used to define the animation duration and easing function. We'll also have to use a value of `forwards` for the `animation-fill-mode` property to keep the last keyframe state after the animation ends.

```css
@keyframes ripple-effect {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(10);
    opacity: 0.375;
  }
  100% {
    transform: scale(35);
    opacity: 0;
  }
}
```

## Positioning the ripple circle

The ripple circle is positioned absolutely inside the button. The `left` and `top` properties are set to the **pointer's coordinates** when the button is clicked. This way, the ripple circle appears to originate from the pointer's position.

In order for this to work in React, we'll need to use the `useState()` and `useEffect()` hooks to manage the button's state and the animation. The state will hold the coordinates and the animation state of the button. Then, using the `useEffect()` hook, we'll update the state variables and start the animation when the button is clicked.

A `setTimeout()` call is used to **clear the animation** after it's done playing. Another `useEffect()` hook is used to reset the coordinates whenever the animation is not playing. Finally, the `onClick` event is handled by updating the coordinates and calling the passed callback.

Putting it all together, here's the complete implementation of a ripple effect button:

```css
.ripple-button {
  border-radius: 4px;
  border: none;
  margin: 8px;
  padding: 14px 24px;
  background: #1976d2;
  color: #fff;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.ripple-button > .ripple {
  width: 20px;
  height: 20px;
  position: absolute;
  background: #63a4ff;
  display: block;
  content: "";
  border-radius: 9999px;
  opacity: 1;
  animation: 0.9s ease 1 forwards ripple-effect;
}

@keyframes ripple-effect {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(10);
    opacity: 0.375;
  }
  100% {
    transform: scale(35);
    opacity: 0;
  }
}

.ripple-button > .content {
  position: relative;
  z-index: 2;
}
```

```jsx
const RippleButton = ({ children, onClick }) => {
  const [coords, setCoords] = React.useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = React.useState(false);

  React.useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  React.useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  return (
    <button
      className="ripple-button"
      onClick={e => {
        const rect = e.target.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        onClick && onClick(e);
      }}
    >
      {isRippling ? (
        <span
          className="ripple"
          style={{
            left: coords.x,
            top: coords.y
          }}
        />
      ) : (
        ''
      )}
      <span className="content">{children}</span>
    </button>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <RippleButton onClick={e => console.log(e)}>Click me</RippleButton>
);
```
