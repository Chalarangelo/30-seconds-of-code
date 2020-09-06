---
title: Mailto
tags: components,beginner
---

Renders a link formatted to send an email.

- Destructure the component's props, use `email`, `subject` and `body` to create a `<a>` element with an appropriate `href` attribute.
- Render the link with `children` as its content.

```jsx
const Mailto = ({ email, subject, body, children }) => {
  return (
    <a href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>{children}</a>
  );
};
```

```jsx
ReactDOM.render(
  <Mailto email="foo@bar.baz" subject="Hello & Welcome" body="Hello world!">
    Mail me!
  </Mailto>,
  document.getElementById('root')
);
```
