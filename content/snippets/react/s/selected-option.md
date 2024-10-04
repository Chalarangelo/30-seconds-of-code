---
title: How can I set the value of a select input in React?
shortTitle: Select input value
language: react
tags: [components,input]
cover: two-doors
excerpt: Learn of all the different ways to set the value of a selected input in React with this quick guide.
listed: true
dateModified: 2024-06-22
---

## Adding selected to an option

A very common way of setting a `<select>` input's value is by adding a `selected` attribute to one of its `<option>` elements. For example:

```jsx
const Select = ({ values, callback, selected }) => {
  return (
    <select
      disabled={disabled}
      readOnly={readonly}
      onChange={({ target: { value } }) => callback(value)}
    >
      {values.map(([value, text]) => (
        <option selected={selected === value} value={value}>
          {text}
        </option>
      ))}
    </select>
  );
}
```

## Setting value for the select

While this approach closely resembles HTML and feels intuitive, there is an **easier way** to do the same thing. [React](https://reactjs.org/docs/forms.html#the-select-tag) provides us with a shared API between `<input type="text">`, `<textarea>` and `<select>` where we can use `value` or `defaultValue` (depending if the input is controlled or not) to set the field's value.

Using this API, we minimize the effort of checking for the selected value, as well as making the code easier to read and update as necessary. Here's an example:

```jsx
const Select = ({ values, callback, selected }) => {
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
```

Note that the above implementation uses `defaultValue`, therefore it implies that the component is **uncontrolled**. You can convert this `Select` component into a **controlled** component by using `value` instead of `defaultValue`.

## Making a reusable component

Putting everything we've seen together, we can create an uncontrolled `<select>` component that uses a callback function to pass its value to the parent component.

To make its API as usable as possible, we'll use the `selectedValue` prop as the `defaultValue` of the `<select>` element to set its **initial value**. We'll also use the `onChange` event to fire the `onValueChange` callback and send the new value to the parent.

Finally, we'll use `Array.prototype.map()` on the `values` array to create an `<option>` element for each passed value. Each item in `values` must be a **2-element array**, where the first element is the `value` of the item and the second one is the displayed text for it.

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

const choices = [
  ['grapefruit', 'Grapefruit'],
  ['lime', 'Lime'],
  ['coconut', 'Coconut'],
  ['mango', 'Mango'],
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <Select
    values={choices}
    selectedValue="lime"
    onValueChange={val => console.log(val)}
  />
);
```
