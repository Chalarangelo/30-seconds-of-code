### Input

Renders an `<input>` element that uses a callback function to pass its value to the parent component.

Use object destructuring to set defaults for certain attributes of the `<input>` element.
Render an `<input>` element with the appropriate attributes and use the `callback` function in the `onChange` event to pass the value of the input to the parent.

```jsx
function Input ({ callback, type = 'text', disabled = false, readOnly = false, placeholder = '' }) {
  return (
    <input
      type={type}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={({ target: { value } }) => callback(value)}
    />
  );
}
```

```jsx
ReactDOM.render(
  <Input type='text' placeholder='Insert some text here...' callback={(val) => console.log(val)}/>,
  document.getElementById('root')
);
```

<!-- tags: input -->

<!-- expertise: 0 -->
