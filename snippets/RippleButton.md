---
title: RippleButton
tags: components,state,effect,intermediate
---

Renders a button that animates a ripple effect when clicked.

- Use the `useState()` hook to create the `coords` and `isRippling` state variables for the pointer's coordinates and the animation state of the button respectively.
- Use a `useEffect()` hook to change the value of `isRippling` every time the `coords` state variable changes, starting the animation.
- Use `setTimeout()` in the previous hook to clear the animation after it's done playing.
- Use a `useEffect()` hook to reset `coords` whenever the `isRippling` state variable is `false.`
- Handle the `onClick` event by updating the `coords` state variable and calling the passed callback.

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
```

```jsx
ReactDOM.render(
  <RippleButton onClick={e => console.log(e)}>Click me</RippleButton>,
  document.getElementById('root')
);
```
