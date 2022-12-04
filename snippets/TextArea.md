---
title: Uncontrolled textarea element
tags: components,input
cover: blog_images/volcano-sunset.jpg
firstSeen: 2018-12-10T10:45:51+02:00
lastUpdated: 2020-11-25T20:46:35+02:00
---

Renders an uncontrolled `<textarea>` element that uses a callback function to pass its value to the parent component.

- Use the `defaultValue` passed down from the parent as the uncontrolled input field's initial value.
- Use the `onChange` event to fire the `onValueChange` callback and send the new value to the parent.

```jsx
const TextArea = ({
  cols = 20,
  rows = 2,
  defaultValue,
  onValueChange,
  ...rest
}) => {
  return (
    <textarea
      cols={cols}
      rows={rows}
      defaultValue={defaultValue}
      onChange={({ target: { value } }) => onValueChange(value)}
      {...rest}
    />
  );
};
```

```jsx
ReactDOM.render(
  <TextArea
    placeholder="Insert some text here..."
    onValueChange={val => console.log(val)}
  />,
  document.getElementById('root')
);
```
