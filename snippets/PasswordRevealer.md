### PasswordRevealer

Renders a password input field with a reveal button.

Use the `React.useState()` hook to create the `shown` state variable and set its value to `false`.
Use a`<div>` to wrap both the`<input>` and the `<button>` element that toggles the type of the input field between `"text"` and `"password"`.

```jsx
function PasswordRevealer({ value }) {
  const [shown, setShown] = React.useState(false);

  return (
    <div>
      <input
        type={shown ? "text" : "password"}
        value={value}
        onChange={() => {}}
      />
      <button onClick={() => setShown(!shown)}>Show/Hide</button>
    </div>
  );
}
```

```jsx
ReactDOM.render(<PasswordRevealer />, document.getElementById('root'));
```

<!--tags: input,state -->

<!--expertise: 0 -->

