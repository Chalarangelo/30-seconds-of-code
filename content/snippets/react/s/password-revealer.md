---
title: Show/hide password toggle component
shortTitle: Password revealer
language: react
tags: [components,input,state]
cover: thread
excerpt: Ever wanted to show the password the user is typing? Here's how you can create a password input field with a reveal button in React.
listed: true
dateModified: 2024-06-14
---

Have you ever wondered how **password reveal** buttons work? Perhaps you've tried to build one yourself by storing the password in a state variable and toggling its visibility. Luckily, there's a much simpler way, leveraging HTML's built-in password input field.

All you really need to understand for this trick to work is that changing the `type` attribute of the `<input>` element from `'password'` to `'text'` will reveal the password. This is a simple and relatively secure way to show the password the user is typing.

In order to leverage this knowledge, you will need to use the `useState()` hook to create a state variable that toggles the `type` attribute of the `<input>` element. When the user clicks the reveal button, you can update the state variable to toggle the password's visibility.

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <PasswordRevealer />
);
```
