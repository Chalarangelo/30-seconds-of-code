---
title: Toggle component
language: react
tags: [components,state]
cover: cows
excerpt: Render a simple toggle component in React.
listed: true
dateModified: 2024-06-15
---

Toggle components have been a **stand-in for checkboxes** in web applications for a long time. They provide a simple way to switch between **two states**, like "ON" and "OFF". In React, you can create a toggle component using the `useState()` hook to manage the state of the toggle.

All you need to do is use the `useState()` hook to create a state variable for the toggle's state. Then, you can render an `<input>` element and bind its `onChange` event to update the state variable. Finally, apply the appropriate `className` to the wrapping `<label>` based on the state.

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <Toggle />
);
```
