### Accordion

Renders an accordion menu with multiple collapsible content components.

* Define an `AccordionItem` component, pass it to the `Accordion` and remove unnecessary nodes expect for `AccordionItem` by identifying the function's name in `props.children`.
* Each `AccordionItem` component renders a `<button>` that is used to update the `Accordion` via the `props.handleClick` callback and the content of the component, passed down via `props.children`, while its appearance is determined by `props.isCollapsed` and based on `style`.
* In the `Accordion` component, use the `React.useState()` hook to initialize the value of the `bindIndex` state variable to `props.defaultIndex`.
* Use `Array.prototype.map` on the collected nodes to render the individual collapsiple elements.
* Define `changeItem`, which will be executed when clicking an `AccordionItem`'s `<button>`.
`changeItem` executes the passed callback, `onItemClick` and updates `bindIndex` based on the clicked element.

```jsx
function AccordionItem(props) {
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
      <button style={style.buttonStyle} onClick={() => props.handleClick()}>
        {props.label}
      </button>
      <div
        className="collapse-content"
        style={props.isCollapsed ? style.collapsed : style.expanded}
        aria-expanded={props.isCollapsed}
      >
        {props.children}
      </div>
    </div>
  );
}

function Accordion(props) {
  const [bindIndex, setBindIndex] = React.useState(props.defaultIndex);

  const changeItem = itemIndex => {
    if (typeof props.onItemClick === 'function') props.onItemClick(itemIndex);
    if (itemIndex !== bindIndex) setBindIndex(itemIndex);
  };
  const items = props.children.filter(item => item.type.name === 'AccordionItem');

  return (
    <div className="wrapper">
      {items.map(({ props }) => (
        <AccordionItem
          isCollapsed={bindIndex === props.index}
          label={props.label}
          handleClick={() => changeItem(props.index)}
          children={props.children}
        />
      ))}
    </div>
  );
}
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

<!-- tags: visual,children,state -->

<!-- expertise: 2 -->
