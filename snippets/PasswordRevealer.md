---
title: PasswordRevealer
tags: components,input,state,beginner
---

Renders a password input field with a reveal button.

- Use the `useState()` hook to create the `shown` state variable and set its value to `false`.
- When the `<button>` is clicked, execute `setShown`, toggling the `type` of the `<input>` between `"text"` and `"password"`.

```jsx
const PasswordRevealer = ({ value }) => {
  const [shown, setShown] = React.useState(false);
  return (
    <>
      <input type={shown ? 'text' : 'password'} value={value} />
      <button onClick={() => setShown(!shown)}>Show/Hide</button>
    </>
  );
};
```

```jsx
ReactDOM.render(<PasswordRevealer />, document.getElementById('root'));
```
