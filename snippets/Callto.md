---
title: Callto
tags: components,beginner
---

Renders a link formatted to dial a phone number.

- Destructure the component's props, use `phone` to create a `<a>` element with an appropriate `href` attribute.
- Render the link with `children` as its content.

```jsx
const Callto = ({ phone, children }) => {
  return (
    <a href={`tel:${phone}`}>{children}</a>
  );
};
```

```jsx
ReactDOM.render(
  <Callto phone="+923081734339">
    Call me!
  </Callto>,
  document.getElementById('root')
);
```
