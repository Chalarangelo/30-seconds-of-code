### Collapse

Renders a component with collapsible content.

Use the value of the `collapsed` prop to determine the initial state of the content (collapsed/expanded).
Set the `state` of the component to the value of the `collapsed` prop (cast to a boolean value) and bind the `toggleCollapse` method to the component's context.
Use an object, `style`, to hold the styles for individual components and their states.
Create a method, `toggleCollapse`, which uses `Component.prototype.setState` to change the component's `state` from collapsed to expanded and vice versa.
In the `render()` method, use a `<div>` to wrap both the `<button>` that alters the component's `state` and the content of the component, passed down via `props.children`.
Determine the appearance of the content, based on `state.collapsed` and apply the appropriate CSS rules from the `style` object.
Finally, update the value of the `aria-expanded` attribute based on `state.collapsed` to make the component accessible.

```jsx
class Collapse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: !!props.collapsed
    };
    this.style = {
      collapsed: {
        display: 'none'
      },
      expanded: {
        display: 'block'
      },
      buttonStyle: {
        display: 'block',
        width: '100%'
      }
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }
  
  toggleCollapse() {
    this.setState(state => ({ collapsed: !state.collapsed }));
  }
  
  render() {
    return (
      <div>
        <button style={this.style.buttonStyle} onClick={this.toggleCollapse}>
          Show/Hide Content
        </button>
        <div 
          style= {this.state.collapsed ? this.style.collapsed : this.style.expanded} 
          aria-expanded = {this.state.collapsed}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
```

```jsx
ReactDOM.render(
  <Collapse>
    <h1>This is a collapse</h1>
    <p>Hello world!</p>
  </Collapse>,
  document.getElementById('root')
);
```

<!-- tags: visual,children,state,class -->

<!-- expertise: 2 -->
