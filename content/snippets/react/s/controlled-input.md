---
title: Controlled input field
type: snippet
language: react
tags: [components,input]
cover: digital-nomad-5
dateModified: 2020-11-03T21:08:39+02:00
---

Renders a controlled `<input>` element that uses a callback function to inform its parent about value updates.

- Use the `value` passed down from the parent as the controlled input field's value.
- Use the `onChange` event to fire the `onValueChange` callback and send the new value to the parent.
- The parent must update the input field's `value` prop in order for its value to change on user input.

```jsx
const ControlledInput = ({ value, onValueChange, ...rest }) => {
  return (
    <input
      value={value}
      onChange={({ target: { value } }) => onValueChange(value)}
      {...rest}
    />
  );
};
```

```jsx
const Form = () => {
  const [value, setValue] = React.useState('');

  return (
    <ControlledInput
      type="text"
      placeholder="Insert some text here..."
      value={value}
      onValueChange={setValue}
    />
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Form />
);
```
