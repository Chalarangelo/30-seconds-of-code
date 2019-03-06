### MultiselectCheckbox

Renders a checkbox list that uses a callback function to pass its selected value/values to the parent component.

* Use `React.setState()` to create a `data` state variable and set its initial value equal to the `options` prop.
* Create a function `toggle` that is used to toggle the `checked` to update the `data` state variable and call the `onChange` callback passed via the component's props.
* Render a `<ul>` element and use `Array.prototype.map()` to map the `data` state variable to individual `<li>` elements with `<input>` elements as their children.
* Each `<input>` element has the `type='checkbox'` attribute and is marked as `readOnly`, as its click events are handled by the parent `<li>` element's `onClick` handler.

```jsx
const style = {
  listContainer: {
    listStyle: 'none',
    paddingLeft: 0
  },
  itemStyle: {
    cursor: 'pointer',
    padding: 5
  }
};

function MultiselectCheckbox({ options, onChange }) {
  const [data, setData] = React.useState(options);

  const toggle = item => {
    data.map((_, key) => {
      if (data[key].label === item.label) data[key].checked = !item.checked;
    });
    setData([...data]);
    onChange(data);
  };

  return (
    <ul style={style.listContainer}>
      {data.map(item => {
        return (
          <li key={item.label} style={style.itemStyle} onClick={() => toggle(item)}>
            <input readOnly type="checkbox" checked={item.checked || false} />
            {item.label}
          </li>
        );
      })}
    </ul>
  );
}
```

```jsx
const options = [{ label: 'Item One' }, { label: 'Item Two' }];

ReactDOM.render(
  <MultiselectCheckbox
    options={options}
    onChange={data => {
      console.log(data);
    }}
  />,
  document.getElementById('root')
);
```

<!-- tags: input,state,array -->

<!-- expertise: 1 -->
