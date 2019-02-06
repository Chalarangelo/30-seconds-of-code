### TreeView

Renders a tree view of a JSON object or array with collapsible content.

Use `defaultProps` to set the default values of certain props.
Use the value of the `toggled` prop to determine the initial state of the content (collapsed/expanded).
Set the `state` of the component to the value of the `toggled` prop and bind the `toggle` method to the component's context.
Create a method, `toggle`, which uses `Component.prototype.setState` to change the component's `state` from collapsed to expanded and vice versa.
In the `render()` method, use a `<div>` to wrap the contents of the component and the `<span>` element, used to alter the component's `state`.
Determine the appearance of the component, based on `this.props.isParentToggled`, `this.state.toggled`, `this.props.name` and `Array.isArray()` on `this.props.data`. 
For each child in `this.props.data`, determine if it is an object or array and recursively render a sub-tree.
Otherwise, render a `<p>` element with the appropriate style.

```css
.tree-element {
  margin: 0;
  position: relative;
}

div.tree-element:before {
  content: '';
  position: absolute;
  top: 24px;
  left: 1px;
  height: calc(100% - 48px);
  border-left: 1px solid gray;
}

.toggler {
  position: absolute;
  top: 10px;
  left: 0px;
  width: 0; 
  height: 0; 
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 5px solid gray;
  cursor: pointer;
}

.toggler.closed {
  transform: rotate(90deg);
}

.collapsed {
  display: none;
}
```

```jsx
class TreeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: props.toggled
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(state => ({ toggled: !state.toggled }));
  }

  render() {
    return (
      <div
        style={{ marginLeft: this.props.isChildElement ? 16 : 4 + "px" }}
        className={
          this.props.isParentToggled ? "tree-element" : "tree-element collapsed"
        }
      >
        <span
          className={this.state.toggled ? "toggler" : "toggler closed"}
          onClick={this.toggle}
        />
        {this.props.name ? (
          <strong>&nbsp;&nbsp;{this.props.name}: </strong>
        ) : (
          <span>&nbsp;&nbsp;</span>
        )}
        {Array.isArray(this.props.data) ? "[" : "{"}
        {!this.state.toggled && "..."}
        {Object.keys(this.props.data).map(
          (v, i, a) =>
            typeof this.props.data[v] == "object" ? (
              <TreeView
                data={this.props.data[v]}
                isLast={i === a.length - 1}
                name={Array.isArray(this.props.data) ? null : v}
                isChildElement
                isParentToggled={
                  this.props.isParentToggled && this.state.toggled
                }
              />
            ) : (
              <p
                style={{ marginLeft: 16 + "px" }}
                className={
                  this.state.toggled ? "tree-element" : "tree-element collapsed"
                }
              >
                {Array.isArray(this.props.data) ? "" : <strong>{v}: </strong>}
                {this.props.data[v]}
                {i === a.length - 1 ? "" : ","}
              </p>
            )
        )}
        {Array.isArray(this.props.data) ? "]" : "}"}
        {!this.props.isLast ? "," : ""}
      </div>
    );
  }
}

TreeView.defaultProps = {
  isLast: true,
  toggled: true,
  name: null,
  isChildElement: false,
  isParentToggled: true
}
```

```jsx
let data = {
  lorem: {
    ipsum: "dolor sit",
    amet: {
      consectetur: "adipiscing",
      elit: [
        "duis",
        "vitae",
        {
          semper: "orci"
        },
        {
          est: "sed ornare"
        },
        "etiam",
        ["laoreet", "tincidunt"],
        ["vestibulum", "ante"]
      ]
    },
    ipsum: "primis"
  }
};
ReactDOM.render(<TreeView data={data} name='data'/>, document.getElementById("root"));
```

<!-- tags: object,visual,children,state,class -->

<!-- expertise: 2 -->
