### Toggle

Renders a toggle component.

The `state` of the component default to `false` and bind the `handleClick` method to the component's context.
Use an object, `style`, to hold the styles for individual components and their states.
Create a method, `handleClick`, which uses `Component.prototype.setState` to change the component's `state` from toggleOn to toggleOff and vice versa.
In the `render()` method, destruct `state` and `style` to abbreviate typing, use a  `<button>` that alters the component's `state`.
Determine the appearance of the content, based on `state.isToggleOn` and apply the appropriate CSS rules from the `style` object.

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false
    };
    this.style = {
      on: {
        backgroundColor: 'green'
      },
      off: {
        backgroundColor: 'grey'
      }
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    const { isToggleOn } = this.state;
    const { on, off } = this.style;

    return (
      <button
        onClick={this.handleClick}
        style={isToggleOn ? on : off}
      >
        {isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

```jsx
ReactDOM.render(<Toggle />, document.getElementById('root'));
```

<!-- tags: visual,toggle,state,class  -->

<!-- expertise: 0 -->