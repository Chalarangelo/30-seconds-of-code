### Multiple Checkbox

##

Renders a checkbox list with the options provided through `props`.

Initially, all the items in the `options` array only have label ( and / or other data provided by the user ) and `checked` is `undefined` if not provided. On clicking any of the items, the `checked` value for the item is toggled and state is updated with the new list. 

The checkbox input in this case is kept as `readOnly` since click events are handled for the item ( label + input ) and not the `input` alone. An `onChange` prop can be passed to the `MultiCheckbox` component to get the updated list on every change event within the list.


```jsx
export default class MultiCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.style = {
      listContainer: {
        listStyle: 'none',
        paddingLeft: 0,
      },
      itemStyle: {
        cursor: 'pointer',
        padding: 5,
      }
    }
    this.state = {
      options: props.options,
    }
  }

  toggle = (item) => {
    const { options } = this.state;
    const { onChange } = this.props;
    options.map((_, key) => {
      if(options[key].label === item.label) {
        options[key].checked = !item.checked;
      }
    });
    this.setState({
      options,
    }, () => {
      onChange(options);
    });
  }
  
  render() {
    const { options } = this.state;
    return (
      <ul style={this.style.listContainer}>
        {
          options.map(item => (
              <li
                style={this.style.itemStyle}
                onClick={() => this.toggle(item)}
                >
                <input
                  readOnly
                  type="checkbox"
                  checked={item.checked || false}
                />
                {item.label}
              </li>
            ))
        }
      </ul>
    )
  }
}
```
```jsx

const options = [
  { label: 'Item One' },
  { label: 'Item Two' }
];

ReactDOM.render(
  <MultiCheckbox
    options={options}
    onChange={(data) => {
    console.log(data);
    }}
  />,
  document.getElementById('root'));
```