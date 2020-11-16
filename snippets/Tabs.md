---
title: Tabs
tags: components,state,children,intermediate
---

Renders a tabbed menu and view component.

- Define a `Tabs` component that uses the `useState()` hook to initialize the value of the `bindIndex` state variable to `defaultIndex`.
- Define a `TabItem` component and filter `children` passed to the `Tabs` component to remove unnecessary nodes except for `TabItem` by identifying the function's name.
- Define `changeTab`, which will be executed when clicking a `<button>` from the menu.
- `changeTab` executes the passed callback, `onTabClick`, and updates `bindIndex` based on the clicked element.
- Use `Array.prototype.map()` on the collected nodes to render the menu and view of the tabs, using the value of `binIndex` to determine the active tab and apply the correct `className`.

```css
.tab-menu > button {
  cursor: pointer;
  padding: 8px 16px;
  border: 0;
  border-bottom: 2px solid transparent;
  background: none;
}

.tab-menu > button.focus {
  border-bottom: 2px solid #007bef;
}

.tab-menu > button:hover {
  border-bottom: 2px solid #007bef;
}

.tab-content {
  display: none;
}

.tab-content.selected {
  display: block;
}
```

```jsx
const TabItem = props => <div {...props} />;

const Tabs = ({ defaultIndex = 0, onTabClick, children }) => {
  const [bindIndex, setBindIndex] = React.useState(defaultIndex);
  const changeTab = newIndex => {
    if (typeof onItemClick === 'function') onItemClick(itemIndex);
    setBindIndex(newIndex);
  };
  const items = children.filter(item => item.type.name === 'TabItem');

  return (
    <div className="wrapper">
      <div className="tab-menu">
        {items.map(({ props: { index, label } }) => (
          <button
            key={`tab-btn-${index}`}
            onClick={() => changeTab(index)}
            className={bindIndex === index ? 'focus' : ''}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="tab-view">
        {items.map(({ props }) => (
          <div
            {...props}
            className={`tab-content ${
              bindIndex === props.index ? 'selected' : ''
            }`}
            key={`tab-content-${props.index}`}
          />
        ))}
      </div>
    </div>
  );
};
```

```jsx
ReactDOM.render(
  <Tabs defaultIndex="1" onTabClick={console.log}>
    <TabItem label="A" index="1">
      Lorem ipsum
    </TabItem>
    <TabItem label="B" index="2">
      Dolor sit amet
    </TabItem>
  </Tabs>,
  document.getElementById('root')
);
```
