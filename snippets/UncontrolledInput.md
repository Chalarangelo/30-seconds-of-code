---
title: Uncontrolled input field
tags: components,input
cover: blog_images/digital-nomad-15.jpg
firstSeen: 2019-08-21T12:28:50+03:00
lastUpdated: 2020-11-03T21:08:39+02:00
---

Renders an uncontrolled `<input>` element that uses a callback function to inform its parent about value updates.

- Use the `defaultValue` passed down from the parent as the uncontrolled input field's initial value.
- Use the `onChange` event to fire the `onValueChange` callback and send the new value to the parent.

```jsx
const UncontrolledInput = ({ defaultValue, onValueChange, ...rest }) => {
  return (
    <input
      defaultValue={defaultValue}
      onChange={({ target: { value } }) => onValueChange(value)}
      {...rest}
    />
  );
};
```

```jsx
ReactDOM.render(
  <UncontrolledInput
    type="text"
    placeholder="Insert some text here..."
    onValueChange={console.log}
  />,
  document.getElementById('root')
);
```
