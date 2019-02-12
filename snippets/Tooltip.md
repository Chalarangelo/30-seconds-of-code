### Tooltip

Renders a tooltip component.

Use the `React.useState()` hook to create the `show` variable and initialize it to `false`.
Return a `<div>` element that contains the `<div>` that will be the tooltip and the `children` passed to the component.
Handle the `onMouseEnter` and `onMouseLeave` methods, by altering the value of the `show` variable.
 
```css
.tooltip {
  position: relative;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  visibility: hidden;
  padding: 5px;
  border-radius: 5px;
}
.tooltip-arrow {
  position: absolute;
  top: 100%;
  left: 50%;
  border-width: 5px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.7) transparent transparent;
}
```
```jsx
function Tooltip({ children, text, ...rest }) {
  const [show, setShow] = React.useState(false);

  return (
    <div>
      <div className="tooltip" style={show ? { visibility: "visible" } : {}}>
        {text}
        <span className="tooltip-arrow" />
      </div>
      <div
        {...rest}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
    </div>
  );
}
```

```jsx
 ReactDOM.render(
     <Tooltip text='Simple tooltip'>
       <button>Hover me!</button>
     </Tooltip>,
     document.getElementById('root')
 );
```
 
<!-- tags: visual,state,children -->

<!-- expertise: 1 -->
