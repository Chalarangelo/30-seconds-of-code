### Tooltip

Renders a tooltip component.
<br/><br/>

 The `show` property on the component state is set to `false` as default.
 
 Use an object, `style`, to hold the styles for the component.
 
 Create a method, `toggleTooltip`, which uses `this.setState` to change the state's `show` property from `true` to `false` and vice versa.
 
 In the `render()` method, destructure `state` and `props`, compute if visibility style should be set to `visible` or not and apply the combined style
 to the tooltip component.
 
 Render the `children` as sibling to the tooltip using [React.cloneElement](https://reactjs.org/docs/react-api.html#cloneelement) and pass down rest
 props along with `onMouseEnter` and `onMouseLeave` events which we bind to the `toggleTooltip` call.
 
 
```jsx
class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.style = {
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "white",
        visibility: "hidden",
        width: "fit-content",
        padding: 5,
        borderRadius: 5
      },
      visible: {
        visibility: "visible"
      }
    };
  }

  toggleTooltip = tooltipState => {
    this.setState({
      show: tooltipState
    });
  };

  render() {
    const { children, ...rest } = this.props;
    const { show } = this.state;
    const { visible, tooltip } = this.style;
    const showTooltip = show ? visible : {};
    return (
      <div>
        <div style={{ ...tooltip, ...showTooltip }}>
          This is a simple tooltip
        </div>
        {React.cloneElement(children, {
          ...rest,
          onMouseEnter: () => this.toggleTooltip(true),
          onMouseLeave: () => this.toggleTooltip(false)
        })}
      </div>
    );
  }
}
```
```jsx
 ReactDOM.render(<Tooltip />, document.getElementById('root'));
 ```
