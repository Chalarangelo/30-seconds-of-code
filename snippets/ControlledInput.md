---
title: Controlled input field
tags: components,input
cover: blog_images/digital-nomad-5.jpg
firstSeen: 2019-08-21T13:09:10+03:00
lastUpdated: 2020-11-03T21:08:39+02:00
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

ReactDOM.render(<Form />, document.getElementById('root'));
```
