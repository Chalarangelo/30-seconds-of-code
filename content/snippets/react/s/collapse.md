---
title: Collapsible content
type: snippet
language: react
tags: [components,children,state]
cover: washed-ashore
dateModified: 2021-10-13T19:29:39+02:00
---

Renders a component with collapsible content.

- Use the `useState()` hook to create the `isCollapsed` state variable. Give it an initial value of `collapsed`.
- Use the `<button>` to change the component's `isCollapsed` state and the content of the component, passed down via `children`.
- Use `isCollapsed` to determine the appearance of the content and apply the appropriate `className`.
- Update the value of the `aria-expanded` attribute based on `isCollapsed` to make the component accessible.

```css
.collapse-button {
  display: block;
  width: 100%;
}

.collapse-content.collapsed {
  display: none;
}

.collapsed-content.expanded {
  display: block;
}
```

```jsx
const Collapse = ({ collapsed, children }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed);

  return (
    <>
      <button
        className="collapse-button"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? 'Show' : 'Hide'} content
      </button>
      <div
        className={`collapse-content ${isCollapsed ? 'collapsed' : 'expanded'}`}
        aria-expanded={isCollapsed}
      >
        {children}
      </div>
    </>
  );
};
```

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <Collapse>
    <h1>This is a collapse</h1>
    <p>Hello world!</p>
  </Collapse>
);
```
