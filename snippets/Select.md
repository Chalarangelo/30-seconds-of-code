---
title: Select
tags: components,input,beginner
---

Renders a `<select>` element that uses a callback function to pass its value to the parent component.

- Use object destructuring to set defaults for certain attributes of the `<select>` element.
- Render a `<select>` element with the appropriate attributes and use the `callback` function in the `onChange` event to pass the value of the textarea to the parent.
- Use the `selected` attribute to define the `defaultValue` of the `<select>` element.
- Use destructuring on the `values` array to pass an array of `value` and `text` elements.

```jsx
function Select({ values, callback, disabled = false, readonly = false, selected }) {
  return (
    <select
      disabled={disabled}
      readOnly={readonly}
      defaultValue={selected}
      onChange={({ target: { value } }) => callback(value)}
    >
      {values.map(([value, text]) => (
        <option value={value}>
          {text}
        </option>
      ))}
    </select>
  );
}

let choices = [
  ['grapefruit', 'Grapefruit'],
  ['lime', 'Lime'],
  ['coconut', 'Coconut'],
  ['mango', 'Mango']
];
ReactDOM.render(
  <Select values={choices} selected="lime" callback={val => console.log(val)} />,
  document.getElementById('root')
);
```

```jsx
let choices = [
  ['grapefruit', 'Grapefruit'],
  ['lime', 'Lime'],
  ['coconut', 'Coconut'],
  ['mango', 'Mango']
];
ReactDOM.render(
  <Select values={choices} selected="lime" callback={val => console.log(val)} />,
  document.getElementById('root')
);
```
