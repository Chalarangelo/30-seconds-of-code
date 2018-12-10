### Input

Renders an `<input>` element that uses a callback function to pass its value to the parent component.

Use object destructuring to set defaults for certain attributes of the `<input>` element.
Render an `<input>` element with the appropriate attributes and use the `callback` function in the `onChange` event to pass the value of the input to the parent.

```jsx
function Input ({ callback, type = 'text', disabled = false, readonly = false, placeholder = '' }) {
  return (
    <input 
      type={type} 
      disabled={disabled} 
      readonly={readonly} 
      placeholder={placeholder}
      onChange={(event) => callback(event.target.value)} 
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

<!-- tags: input,functional -->

<!-- expertise: 0 -->
