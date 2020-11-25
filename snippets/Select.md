---
title: Select
tags: components,input,beginner
---

Renders an uncontrolled `<select>` element that uses a callback function to pass its value to the parent component.

- Use the the `selectedValue` prop as the `defaultValue` of the `<select>` element to set its initial value..
- Use the `onChange` event to fire the `onValueChange` callback and send the new value to the parent.
- Use `Array.prototype.map()` on the `values` array to create an `<option>` element for each passed value. 
- Each item in `values` must be a 2-element array, where the first element is the `value` of the item and the second one is the displayed text for it.

```jsx
const Select = ({ values, onValueChange, selectedValue, ...rest }) => {
  return (
    <select
      defaultValue={selectedValue}
      onChange={({ target: { value } }) => onValueChange(value)}
      {...rest}
    >
      {values.map(([value, text]) => (
        <option key={value} value={value}>
          {text}
        </option>
      ))}
    </select>
  );
};
```

```jsx
const choices = [
  ['grapefruit', 'Grapefruit'],
  ['lime', 'Lime'],
  ['coconut', 'Coconut'],
  ['mango', 'Mango'],
];
ReactDOM.render(
  <Select
    values={choices}
    selectedValue="lime"
    onValueChange={val => console.log(val)}
  />,
  document.getElementById('root')
);
```
