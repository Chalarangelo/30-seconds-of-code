### Toggle

Renders a toggle component.

Use the `React.useState()` to initialize the `isToggleOn` state variable to `false`.
Use an object, `style`, to hold the styles for individual components and their states.
Return a `<button>` that alters the component's `isToggledOn` when its `onClick` event is fired and determine the appearance of the content based on `isToggleOn`, applying the appropriate CSS rules from the `style` object.

```jsx
function Toggle(props) {
  const [isToggleOn, setIsToggleOn] = React.useState(false);
  style = {
    on: {
      backgroundColor: "green"
    },
    off: {
      backgroundColor: "grey"
    }
  };

  return (
    <button
      onClick={() => setIsToggleOn(!isToggleOn)}
      style={isToggleOn ? style.on : style.off}
    >
      {isToggleOn ? "ON" : "OFF"}
    </button>
  );
}
```

```jsx
ReactDOM.render(<Toggle />, document.getElementById('root'));
```

<!-- tags: visual,state  -->

<!-- expertise: 0 -->
