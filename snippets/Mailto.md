### Mailto

Renders a link formatted to send an email.

Destructure the component's props, use `email`, `subject` and `body` to create a `<a>` element with an appropriate `href` attribute.
Render the link with `props.children` as its content.

```jsx
function Mailto({ email, subject, body, ...props }) {
  return (
    <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>
      {props.children}
    </a>
  );
}
```

```jsx
ReactDOM.render(
  <Mailto email="foo@bar.baz" subject="Hello" body="Hello world!">
    Mail me!
  </Mailto>,
  document.getElementById("root")
);
```

<!-- tags: functional -->

<!-- expertise: 0 -->
