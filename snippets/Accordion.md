---
title: Accordion
tags: components,children,state,advanced
---

Renders an accordion menu with multiple collapsible content elements.

- Define an `AccordionItem` component, that renders a `<button>` which is used to update the component and notify its parent via the `handleClick` callback.
- Use the `isCollapsed` prop in `AccordionItem` to determine its appearance and set an appropriate `className`.
- Define an `Accordion` component that uses the `useState()` hook to initialize the value of the `bindIndex` state variable to `defaultIndex`.
- Filter `children` to remove unnecessary nodes except for `AccordionItem` by identifying the function's name.
- Use `Array.prototype.map()` on the collected nodes to render the individual collapsible elements.
- Define `changeItem`, which will be executed when clicking an `AccordionItem`'s `<button>`.
- `changeItem` executes the passed callback, `onItemClick`, and updates `bindIndex` based on the clicked element.

```css
.accordion-item.collapsed {
  display: none;
}

.accordion-item.expanded {
  display: block;
}

.accordion-button {
  display: block;
  width: 100%;
}
```

```jsx
const AccordionItem = ({ label, isCollapsed, handleClick, children }) => {
  return (
    <>
      <button className="accordion-button" onClick={handleClick}>
        {label}
      </button>
      <div
        className={`accordion-item ${isCollapsed ? 'collapsed' : 'expanded'}`}
        aria-expanded={isCollapsed}
      >
        {children}
      </div>
    </>
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
    <>
      {items.map(({ props }) => (
        <AccordionItem
          isCollapsed={bindIndex !== props.index}
          label={props.label}
          handleClick={() => changeItem(props.index)}
          children={props.children}
        />
      ))}
    </>
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
