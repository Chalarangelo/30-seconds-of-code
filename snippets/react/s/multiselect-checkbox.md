---
title: Stateful checkbox with multiple selection
type: snippet
language: react
tags: [components,input,state,array]
cover: violin
dateModified: 2021-10-13T19:29:39+02:00
---

Renders a checkbox list that uses a callback function to pass its selected value/values to the parent component.

- Use the `useState()` hook to create the `data` state variable and use the `options` prop to initialize its value.
- Create a `toggle` function that uses the spread operator (`...`) and `Array.prototype.splice()` to update the `data` state variable and call the `onChange` callback with any `checked` options.
- Use `Array.prototype.map()` to map the `data` state variable to individual `<input type="checkbox">` elements. Wrap each one in a `<label>`, binding the `onClick` handler to the `toggle` function.

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
```

```jsx
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
