---
title: UncontrolledInput
tags: components,input,intermediate
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
