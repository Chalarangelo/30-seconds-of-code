---
title: Alert
tags: components,state,effect,beginner
---

Creates an alert component with `type` prop.

- Define appropriate CSS styles and animations for the component's elements.
- Use the `React.useState()` hook to create the `isShown` and `isLeaving` state variables and set their values to `false`.
- Define `timeoutId` to keep the timer instance for clearing on component unmount.
- Use the `React.useEffect()` hook to update the value of `isShown` to `true` and clear interval by using `timeoutId` when component is unmounted.
- Define `closeAlert` function to set the component is removed from DOM by displaying fading out animation and set `isShown` to `false` via `setTimeout()`.
- Define the component, which renders the alert component with user defined `message` and a close button to remove the component from DOM.

```css
@keyframes leave {
  0% { opacity: 1 }
  100% { opacity: 0 }
}

.alert {
  padding: 0.75rem 0.5rem;
  margin-bottom: 0.5rem;
  text-align: left;
  padding-right: 40px;
  border-radius: 4px;
  font-size: 16px;
  position: relative;
}

.alert.warning{
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeeba;
}

.alert.error{
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.alert.leaving{
  animation: leave 0.5s forwards;
}

.alert .close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 0.75rem;
  color: #333;
  border: 0;
  height: 100%;
  cursor: pointer;
  background: none;
  font-weight: 600;
  font-size: 16px;
}

.alert .close:after{
  content: 'x';
}
```

```jsx
const Alert = ({ isDefaultShown = false, timeout = 250, type, message }) => {
  const [isShown, setIsShown] = React.useState(isDefaultShown);
  const [isLeaving, setIsLeaving] = React.useState(false);

  let timeoutId = null;

  React.useEffect(() => {
    setIsShown(true);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isDefaultShown, timeout, timeoutId]);

  const closeAlert = () => {
    setIsLeaving(true);
    timeoutId = setTimeout(() => {
      setIsLeaving(false);
      setIsShown(false);
    }, timeout);
  };

  return isShown && (
    <div className={`alert ${type} ${isLeaving ? 'leaving' : ''}`} role="alert">
      <button className="close" onClick={closeAlert} />
      {message}
    </div>
  );
};
```

```jsx
ReactDOM.render(<Alert type="info" message="This is info" />, document.getElementById('root'));
```
