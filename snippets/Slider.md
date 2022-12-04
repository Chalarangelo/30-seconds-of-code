---
title: Uncontrolled range input
tags: components,input
cover: blog_images/solitude-beach.jpg
firstSeen: 2019-03-02T10:20:55+02:00
lastUpdated: 2020-11-25T20:46:35+02:00
---

Renders an uncontrolled range input element that uses a callback function to pass its value to the parent component.

- Set the `type` of the `<input>` element to `"range"` to create a slider.
- Use the `defaultValue` passed down from the parent as the uncontrolled input field's initial value.
- Use the `onChange` event to fire the `onValueChange` callback and send the new value to the parent.

```jsx
const Slider = ({
  min = 0,
  max = 100,
  defaultValue,
  onValueChange,
  ...rest
}) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      defaultValue={defaultValue}
      onChange={({ target: { value } }) => onValueChange(value)}
      {...rest}
    />
  );
};
```

```jsx
ReactDOM.render(
  <Slider onValueChange={val => console.log(val)} />,
  document.getElementById('root')
);
```
