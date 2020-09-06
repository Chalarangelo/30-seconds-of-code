---
title: Accordion
tags: components,children,state,advanced
---

Renders an accordion menu with multiple collapsible content components.

- Define an `AccordionItem` component, pass it to the `Accordion` and remove unnecessary nodes expect for `AccordionItem` by identifying the function's name in `children`.
- Each `AccordionItem` component renders a `<button>` that is used to update the `Accordion` via the `handleClick` callback and the content of the component, passed down via `children`, while its appearance is determined by `isCollapsed` and based on `style`.
- In the `Accordion` component, use the `React.useState()` hook to initialize the value of the `bindIndex` state variable to `defaultIndex`.
- Use `Array.prototype.map()` on the collected nodes to render the individual collapsiple elements.
- Define `changeItem`, which will be executed when clicking an `AccordionItem`'s `<button>`.
  `changeItem` executes the passed callback, `onItemClick` and updates `bindIndex` based on the clicked element.

```jsx
const AccordionItem = ({ label, isCollapsed, handleClick, children }) => {
  const style = {
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

  return (
    <div>
      <button style={style.buttonStyle} onClick={handleClick}>
        {label}
      </button>
      <div
        className="collapse-content"
        style={isCollapsed ? style.collapsed : style.expanded}
        aria-expanded={isCollapsed}
      >
        {children}
      </div>
    </div>
  );
};

const Accordion = ({ defaultIndex, onItemClick, children }) => {
  const [bindIndex, setBindIndex] = React.useState(defaultIndex);

  const changeItem = itemIndex => {
    if (typeof onItemClick === 'function') onItemClick(itemIndex);
    if (itemIndex !== bindIndex) setBindIndex(itemIndex);
  };
  const items = children.filter(item => item.type.name === 'AccordionItem');

  return (
    <div className="wrapper">
      {items.map(({ props }) => (
        <AccordionItem
          isCollapsed={bindIndex !== props.index}
          label={props.label}
          handleClick={() => changeItem(props.index)}
          children={props.children}
        />
      ))}
    </div>
  );
};
```

```jsx
ReactDOM.render(
  <Accordion defaultIndex="1" onItemClick={console.log}>
    <AccordionItem label="A" index="1">
      Lorem ipsum
    </AccordionItem>
    <AccordionItem label="B" index="2">
      Dolor sit amet
    </AccordionItem>
  </Accordion>,
  document.getElementById('root')
);
```
