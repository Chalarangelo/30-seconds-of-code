---
title: Alert
tags: visual,beginner,state,effect
---

Creates an alert component with `type` prop.

- Define appropriate CSS styles and animations for the component's elements.
- Use the `React.setState()` hook to create the `isShown` and `isLeaving` state variables and set their values to `false`.
- Define `timeoutId` to keep the timer instance for clearing on component unmount.
- Use the `React.setEffect()` hook to update the value of `isShown` to `true` and clear interval by using `timeoutId` when component is unmounted.
- Define `closeNotification` function to set the component is removed from DOM by displaying fading out animation and set `isShown` to `false` via `setTimeout()`. 
- Define the component, which renders alert component with user defined `message` and a close button to remove the component from DOM.

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

.alert.success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.alert.info{
  color: #004085;
  background-color: #cce5ff;
  border-color: #b8daff;
}

.alert.warning{
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeeba;
}

.alert.danger{
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
```

```jsx
function Notification(props) {
    const [isShown, setIsShown] = React.useState(false);
    const [isLeaving, setIsLeaving] = React.useState(false);

    let timeoutId = null;

    React.useEffect(() => {
      setIsShown(true);
      return () => {
        clearTimeout(timeoutId);
      }
    }, [props.isShown, props.timeout, timeoutId]);

    const closeNotification = () => {
      setIsLeaving(true);
      timeoutId = setTimeout(() => {
        setIsLeaving(false);
        setIsShown(false);
      }, 250)
    }

    return isShown && (
      <div className={`alert ${props.type}${isLeaving ? ' leaving' : ''}`}>
        <button className="close" onClick={closeNotification}>x</button>
        {props.message}
      </div>
    )
}
```

```jsx
ReactDOM.render(<Notification type="info" message="This is info" />, document.getElementById('root'));
```
