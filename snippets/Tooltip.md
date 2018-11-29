### Tooltip

Renders a tooltip component.

Set the `state` of the component to `show: false` initially, define an object, `style`, to hold the styles for individual components and their states.
Create a method, `toggleTooltip`, which uses `this.setState` to change the state's `show` property from `true` to `false` and vice versa.
Bind `showTooltip` and `hideTooltip` to the component's context with the respective values of `true` and `false`.
In the `render()` method, compute if the tooltip should be shown or hidden, render the content of the tooltip and bind the `onMouseEnter` and `onMouseLeave` events to `showTooltip` and `hideTooltip` respectively.
 
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
 
<!-- tags: visual,state,children,class -->

<!-- expertise: 1 -->
