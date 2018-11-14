### Tooltip

Renders a tooltip component.

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
        position: 'relative',
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "white",
        visibility: "hidden",
        width: "fit-content",
        padding: 5,
        borderRadius: 5
      },
      tooltipArrow: {
        position: 'absolute',
        top: '100%',
        left: '50%',
        borderWidth: 5,
        borderStyle: 'solid',
        borderColor: "rgba(0,0,0,0.7) transparent transparent",
      },
      visible: {
        visibility: "visible"
      },
    };
    this.showTooltip = this.toggleTooltip.bind(this, true);
    this.hideTooltip = this.toggleTooltip.bind(this, false);
  }

  toggleTooltip = tooltipState => {
    this.setState({
      show: tooltipState
    });
  };

  render() {
    const { children, text, ...rest } = this.props;
    const { show } = this.state;
    const { visible, tooltip, tooltipArrow } = this.style;
    const showTooltip = show ? visible : {};
    return (
      <div>
        <div style={{ ...tooltip, ...showTooltip }}>
          {text}
          <span style={tooltipArrow}/>
        </div>
        <div {...rest} onMouseEnter={this.showTooltip} onMouseLeave={this.hideTooltip}>
          {children}
        </div>
      </div>
    );
  }
}
```
```jsx
 ReactDOM.render(
     <Tooltip text='Simple tooltip'>
       <button>Hover me!</button>
     </Tooltip>,
     document.getElementById('root')
 );
 ```
