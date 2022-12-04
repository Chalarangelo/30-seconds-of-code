---
title: Toggle
tags: components,state
cover: blog_images/cows.jpg
firstSeen: 2018-10-27T20:35:37+03:00
lastUpdated: 2020-11-16T16:50:57+02:00
---

Renders a toggle component.

- Use the `useState()` hook to initialize the `isToggledOn` state variable to `defaultToggled`.
- Render an `<input>` and bind its `onClick` event to update the `isToggledOn` state variable, applying the appropriate `className` to the wrapping `<label>`.

```css
.toggle input[type="checkbox"] {
  display: none;
}

.toggle.on {
  background-color: green;
}

.toggle.off {
  background-color: red;
}
```

```jsx
const Toggle = ({ defaultToggled = false }) => {
  const [isToggleOn, setIsToggleOn] = React.useState(defaultToggled);

  return (
    <label className={isToggleOn ? 'toggle on' : 'toggle off'}>
      <input
        type="checkbox"
        checked={isToggleOn}
        onChange={() => setIsToggleOn(!isToggleOn)}
      />
      {isToggleOn ? 'ON' : 'OFF'}
    </label>
  );
};

```

```jsx
ReactDOM.render(<Toggle />, document.getElementById('root'));
```
