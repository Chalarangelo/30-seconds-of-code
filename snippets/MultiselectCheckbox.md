### MultiselectCheckbox

Renders a checkbox list with the `options` provided through `props`.

Initially, all the items in the `options` array only have label ( and / or other data provided by the user ) and `checked` is `undefined` if not provided. On clicking any of the items, the `checked` value for the item is toggled and state is updated with the new list.

An `onChange` prop can be passed to the `MultiCheckbox` component to get the updated list on every change event within the list.

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

function MultiselectCheckbox ({ options, onChange }) {
  const [data, setData] = React.useState(options);

  function toggle (item) {
    data.map((_, key) => {
      if (data[key].label === item.label) {
        data[key].checked = !item.checked;
      }
    });
    setData([...data]);
    onChange(data);
  }

  return (
    <ul style={style.listContainer}>
      {data.map(item => {
        return (
          <li
            key={item.label}
            style={style.itemStyle}
            onClick={() => toggle(item)}
          >
            <input readOnly type='checkbox' checked={item.checked || false} />
            {item.label}
          </li>
        );
      })}
    </ul>
  );
}
```

```jsx
const options = [{ label: "Item One" }, { label: "Item Two" }];

ReactDOM.render(
  <MultiselectCheckbox
    options={options}
    onChange={data => {
      console.log(data);
    }}
  />,
  document.getElementById("root")
);
```

#### Notes:

- The checkbox input in this case is kept as `readOnly` since click events are handled for the item ( label + input ) and not the `input` alone.

expertise: 0
