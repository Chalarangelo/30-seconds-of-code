---
title: How can I set the value of a select input in React?
type: question
tags: react,components,input
authors: maciv
cover: blog_images/react-selected-option.jpg
excerpt: Learn of all the different ways to set the value of a selected input in React with this quick guide.
---

### Adding selected to an option

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

### Setting value for the select

While this approach closely resembles HTML and feels intuitive, there is an easier way to do the same thing. [React](https://reactjs.org/docs/forms.html#the-select-tag) provides us with a shared API between `<input type="text">`, `<textarea>` and `<select>` where we can use `value` or `defaultValue` (depending if the input is controlled or not) to set the field's value.

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

Note that the above implementation uses `defaultValue`, therefore it implies that the component is uncontrolled. You can convert this `Select` component into a controlled component by using `value` instead of `defaultValue`.

For a more detailed explanation of the component, as well as usage examples, you can check out the [Select component](/react/s/select).

**Image credit:** [Robert Anasch](https://unsplash.com/@diesektion?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/code?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
