### Slider

Renders a slider element that uses a callback function to pass its value to the parent component.

* Use object destructuring to set defaults for certain attributes of the `<input>` element.
* Render an `<input>` element of type `"range"` and the appropriate attributes, use the `callback` function in the `onChange` event to pass the value of the input to the parent.

```jsx
function Slider({ callback, disabled = false, readOnly = false }) {
  return (
    <input
      type="range"
      disabled={disabled}
      readOnly={readOnly}
      onChange={({ target: { value } }) => callback(value)}
    />
  );
}
```

```jsx
ReactDOM.render(<Slider callback={val => console.log(val)} />, document.getElementById('root'));
```

<!-- tags: input -->

<!-- expertise: 0 -->
