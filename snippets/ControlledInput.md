---
title: ControlledInput
tags: components,state,effect,intermediate
---

Renders an `<input>` element with internal state, that uses a callback function to pass its value to the parent component.

- Use object destructuring to set defaults for certain attributes of the `<input>` element.
- Use the `React.useState()` hook to create the `value` state variable and give it a value of equal to the `defaultValue` prop.
- Use the `React.useEffect()` hook with a second parameter set to the `value` state variable to call the `callback` function every time `value` is updated.
- Render an `<input>` element with the appropriate attributes and use the the `onChange` event to upda the `value` state variable.

```jsx
const ControlledInput = ({
  callback,
  type = 'text',
  disabled = false,
  readOnly = false,
  defaultValue,
  placeholder = ''
}) => {
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    callback(value);
  }, [value]);

  return (
    <input
      defaultValue={defaultValue}
      type={type}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={({ target: { value } }) => setValue(value)}
    />
  );
};
```

```jsx
ReactDOM.render(
  <ControlledInput
    type="text"
    placeholder="Insert some text here..."
    callback={val => console.log(val)}
  />,
  document.getElementById('root')
);
```
