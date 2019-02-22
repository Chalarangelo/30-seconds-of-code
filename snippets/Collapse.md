### Collapse

Renders a component with collapsible content.

Use the `React.setState()` hook to create the `isCollapsed` state variable with an initial value of `props.collapsed`.
Use an object, `style`, to hold the styles for individual components and their states.
Use a `<div>` to wrap both the `<button>` that alters the component's `isCollapsed` state and the content of the component, passed down via `props.children`.
Determine the appearance of the content, based on `isCollapsed` and apply the appropriate CSS rules from the `style` object.
Finally, update the value of the `aria-expanded` attribute based on `isCollapsed` to make the component accessible.

```jsx
function Collapse(props) {
  const [isCollapsed, setIsCollapsed] = React.useState(props.collapsed);

  const style = {
    collapsed: {
      display: "none"
    },
    expanded: {
      display: "block"
    },
    buttonStyle: {
      display: "block",
      width: "100%"
    }
  };

  return (
    <div>
      <button
        style={style.buttonStyle}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? "Show" : "Hide"} content
      </button>
      <div
        className="collapse-content"
        style={isCollapsed ? style.collapsed : style.expanded}
        aria-expanded={isCollapsed}
      >
        {props.children}
      </div>
    </div>
  );
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

<!-- tags: visual,children,state -->

<!-- expertise: 2 -->
