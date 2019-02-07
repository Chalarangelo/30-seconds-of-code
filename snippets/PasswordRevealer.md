### PasswordRevealer

Renders a password input field with a reveal button.

Initially set `state.shown` to `false` to ensure that the password is not shown by default.
Create a method, `toggleShown`, which uses `Component.prototype.setState` to change the input's state from shown to hidden and vice versa, bind it to the component's context.
In the`render()` method, use a`<div>` to wrap both the`<input>` and the `<button>` element that toggles the type of the input field.
Finally, bind the `<button>`'s `onClick` event to the `toggleShown` method.

```jsx
function PasswordRevealer(props) {
  const { value } = props;

  const [shown, setShown] = useState(false);
  const toggleShown = () => {
    setShown(!shown);
  };

  return (
    <div>
      <input
        type={shown ? "text" : "password"}
        value={value}
        onChange={() => {}}
      />
      <button onClick={() => toggleShown()}>Show/Hide</button>
    </div>
  );
}
```

```jsx
ReactDOM.render(<PasswordRevealer />, document.getElementById('root'));
```

<!--tags: input,state,class -->

<!--expertise: 0 -->

