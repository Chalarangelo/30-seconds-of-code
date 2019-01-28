### Tab
Renders a tabbed menu and view component.

Define `TabItem` as a middleware, pass it to the `Tab` and remove unnecessary nodes expect for `TabItem` by identifying the function's name in `props.children`.
Use `Array.prototype.map` on the collected nodes to render the `tab-menu` and `tab-view`. 
Define `changeTab`, which will be executed when clicking a `<button>` from the `tab-menu`.
`changeTab` executes the passed callback, `onTabClick` and updates `state.bindIndex`, which in turn causes a re-render, evaluating the `style` and `className` of the `tab-view` items and `tab-menu` buttons according to their `index`.

```css
.tab-menu > button {
  cursor: pointer;
  padding: 8px 16px;
  border: 0;
  border-bottom: 2px solid transparent;
  background: none;
}
.tab-menu > button.focus {
  border-bottom: 2px solid #007BEF;
}
.tab-menu > button:hover {
  border-bottom: 2px solid #007BEF;
}
```

```jsx
class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bindIndex: props.defaultIndex
    };
  }
  changeTab(newIndex) {
    if (typeof this.props.onTabClick === "function")
      this.props.onTabClick(newIndex);
    this.setState({
      bindIndex: newIndex
    });
  }
  buttonClass(index) {
    return this.state.bindIndex === index ? "focus" : "";
  }
  itemStyle(index) {
    return {
      display: this.state.bindIndex === index ? "block" : "none"
    };
  }
  render() {
    const items = this.props.children.filter(
      item => item.type.name === "TabItem"
    );
    return (
      <div className="wrapper">
        <div className="tab-menu">
          {items.map(({ props: { index, label } }) => (
            <button
              onClick={() => this.changeTab(index)}
              className={this.buttonClass(index)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="tab-view">
          {items.map(({ props }) => (
            <div
              {...props}
              className="tab-view_item"
              key={props.index}
              style={this.itemStyle(props.index)}
            />
          ))}
        </div>
      </div>
    );
  }
}
function TabItem(props) {
  return <div {...props} />;
}
```
```jsx
ReactDOM.render(
  <Tab defaultIndex="1" onTabClick={console.log}>
    <TabItem label="A" index="1">
      Lorem ipsum
    </TabItem>
    <TabItem label="B" index="2">
      Dolor sit amet
    </TabItem>
  </Tab>,
  document.getElementById("root")
);

```

<!-- tags: visual,children,class -->

<!-- expertise: 1 -->
