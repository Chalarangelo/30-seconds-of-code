### Select

Renders a `<select>` element that uses a callback function to pass its value to the parent component.

Use object destructuring to set defaults for certain attributes of the `<select>` element.
Render a `<select>` element with the appropriate attributes and use the `callback` function in the `onChange` event to pass the value of the textarea to the parent.
Use destructuring on the `values` array to pass an array of `value` and  `text` elements and the `selected` attribute to define the initial `value` of the `<select>` element.

```jsx
function Select ({ values, callback, disabled = false, readonly = false, selected }) {
  return (
    <select
      disabled={disabled}
      readOnly={readonly}
      onChange={({ target : { value } }) => callback(value)}
    >
      {values.map(([value, text]) => <option selected={selected === value}value={value}>{text}</option>)}
    </select>
  );
}
```

```jsx
let choices = [
  ['grapefruit', 'Grapefruit'],
  ['lime', 'Lime'],
  ['coconut', 'Coconut'],
  ['mango', 'Mango']
];
ReactDOM.render(
  <Select values={choices} selected='lime' callback={(val) => console.log(val)}/>,
  document.getElementById('root')
);
```

<!-- tags: input -->

<!-- expertise: 0 -->
