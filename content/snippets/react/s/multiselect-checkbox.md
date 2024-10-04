---
title: Stateful checkbox with multiple selection
language: react
tags: [components,input,state,array]
cover: violin
excerpt: Render a checkbox list that uses a callback function to pass its selected value/values to the parent component.
listed: true
dateModified: 2024-06-13
---

A **group of checkboxes** can be used to allow users to select multiple options from a list. However, managing individual inputs is usually a hassle, so you may want to roll up a React component that handles this for you.

To create a **stateful** checkbox list that supports multiple selections, you can use the `useState()` hook to manage the state of the checkboxes. Using `Array.prototype.splice()` and the spread operator (`...`), you can update the state variable with the new value of the checkbox, when it changes. Finally, you can call a **callback function** with the selected values.

For the **rendering** of the component, you'll have to use `Array.prototype.map()` to map the state variable to individual `<input type="checkbox">` elements. Wrap each one in a `<label>`, binding the `onClick` handler to the `toggle` function.

```jsx
const MultiselectCheckbox = ({ options, onChange }) => {
  const [data, setData] = React.useState(options);

  const toggle = index => {
    const newData = [...data];
    newData.splice(index, 1, {
      label: data[index].label,
      checked: !data[index].checked
    });
    setData(newData);
    onChange(newData.filter(x => x.checked));
  };

  return (
    <>
      {data.map((item, index) => (
        <label key={item.label}>
          <input
            readOnly
            type="checkbox"
            checked={item.checked || false}
            onClick={() => toggle(index)}
          />
          {item.label}
        </label>
      ))}
    </>
  );
};

const options = [{ label: 'Item One' }, { label: 'Item Two' }];

ReactDOM.createRoot(document.getElementById('root')).render(
  <MultiselectCheckbox
    options={options}
    onChange={data => {
      console.log(data);
    }}
  />
);
```
